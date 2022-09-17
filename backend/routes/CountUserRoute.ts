import express from "express";
import {dataCount} from '../controller/CountUser'
import { verifyUser } from '../middleware/AuthUser'

const router = express.Router()

router.get('/count-user', verifyUser, dataCount)

export default router