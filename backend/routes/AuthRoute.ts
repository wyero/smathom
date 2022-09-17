import express from 'express'
import { login, me, logout } from '../controller/Auth'

const router = express.Router()

router.get('/me', me)
router.post('/login', login)
router.delete('/logout', logout)

export default router