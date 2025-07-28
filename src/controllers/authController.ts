import { Request, Response } from "express"
import { comparePassword, hashPassword } from "../services/password.service";
import prisma from '../models/user'
import { generateToken } from "../services/auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    try {
        if (!name) {
            res.status(400).json({ message: "El nombre es obligatorio" })
            return
        }

        if (!email) {
            res.status(400).json({ message: "El email es obligatorio" })
            return
        }

        if (!password) {
            res.status(400).json({ message: "El password es obligatorio" })
            return
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.create({
            data: {
                name,
                email,
                password: hashedPassword,
                rol: 'user'
            }
        })

        const token = generateToken(user)

        res.status(201).json({ message: 'Usuario creado con exito', token: token, user: { id: user.id, name: user.name, email: user.email, rol: user.rol } })
    } catch (error: any) {

        if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
            res.status(409).json({ message: "El email ingresado ya existe" })
            return
        }
        console.log(error)
        res.status(500).json({ message: 'Hubo un error, pruebe mas tarde' })
        return
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body
    try {
        if (!email) {
            res.status(400).json({ message: "El email es obligatorio" })
            return
        }

        if (!password) {
            res.status(400).json({ message: "El password es obligatorio" })
            return
        }

        const user = await prisma.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" })
            return
        }

        const passwordMatch = await comparePassword(password, user.password)
        if (!passwordMatch) {
            res.status(401).json({ message: "usuario y contraseñas no coinciden" })
        }

        const token = generateToken(user)
        res.status(200).json({ message: 'Usuario logeado exitosamente', token: token, user: { id: user.id, name: user.name, email: user.email, rol: user.rol }})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Hubo un error, pruebe mas tarde' })
        return
    }
}





