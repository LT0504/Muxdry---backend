import { Request, Response } from "express";
import { DecodedToken } from "../interfaces/decodedToken.interface";
import prisma from '../models/user'
import { hashPassword } from "../services/password.service";

export const getProfile = async (req: Request, res: Response): Promise<void> => {
    const user = (req as Request & { user: DecodedToken }).user;
    const userId = user.id;
    const userRol = user.rol
    console.log(user.rol)

    try {
        const user = await prisma.findUnique({
            where: {
                id: userId
            },
            select:{
                id: true,
                name: true,
                email: true,

            }
        })

        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" })
            return
        }

        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Hubo un error, pruebe mas tarde' })
        return
    }
}

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body
    const user = (req as Request & { user: DecodedToken }).user;
    const userId = user.id;
    try {
        let dataToUpdate: any = { ...req.body }

        if (password) {
            const hashedPassword = await hashPassword(password)
            dataToUpdate.password = hashedPassword
        }

        if (email) {
            dataToUpdate.email = email
        }

        if (name) {
            dataToUpdate.name = name
        }

        await prisma.update({
            where: {
                id: userId
            },
            data: dataToUpdate
        })

        const user = await prisma.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })
        res.status(200).json({ message: "Usario actualizado correctamente", user })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Hubo un error, pruebe mas tarde' })
        return
    }
}