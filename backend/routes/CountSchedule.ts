import express from "express";
import {dataCount} from '../controller/CountSchedule'
import { verifyUser } from '../middleware/AuthUser'

const router = express.Router()

router.get('/count-schedule', verifyUser, dataCount)

export default router