import dotenv from 'dotenv'
dotenv.config()
import  express  from 'express'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import profileRoutes from './routes/profileRoutes'

const app = express()

app.use(express.json())

app.use('/auth', authRoutes)

app.use('/api', userRoutes)

app.use('/api', profileRoutes)

export default app