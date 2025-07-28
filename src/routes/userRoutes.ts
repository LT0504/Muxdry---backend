import express from 'express'
import { authenticateToken } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/', authenticateToken, () => { return console.log("usuario") })
router.get('/', authenticateToken)
router.get('/:id', authenticateToken)

export default router;