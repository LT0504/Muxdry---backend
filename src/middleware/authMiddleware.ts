import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { DecodedToken } from '../interfaces/decodedToken.interface'
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'No autorizado' })
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Error en la autenticacion', err)
            res.status(403).json({ message: 'No tienes acceso a este recurso' })
        }

        (req as Request & { user: DecodedToken }).user = decoded as DecodedToken;

        //const user = (req as Request & { user: DecodedToken }).user;

        next();
    })
}
