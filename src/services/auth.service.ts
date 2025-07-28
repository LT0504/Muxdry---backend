import { User } from "../interfaces/user.interface"
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'defaul-secret'

export const generateToken = (user: User): string => {
    return jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol
        },
        JWT_SECRET, {
        expiresIn: '1h'
    })
}