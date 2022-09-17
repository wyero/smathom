import express from 'express'
import { createUsers } from '../controller/RegisterController'

const router = express.Router()

router.post('/register',  createUsers)

export default router