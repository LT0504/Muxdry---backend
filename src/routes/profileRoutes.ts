import express from 'express'
import { authenticateToken } from '../middleware/authMiddleware'
import { getProfile, updateProfile } from '../controllers/profileController'

const router = express.Router()

router.get('/profile', authenticateToken, getProfile)
router.put('/profile', authenticateToken, updateProfile)

export default router;