import express from 'express'
import {
    getSchedule,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule
} from '../controller/ScheduleController'

import { verifyUser, admin } from '../middleware/AuthUser'

const router = express.Router()

router.get('/schedule', verifyUser, getSchedule)
router.get('/schedule/:id', verifyUser, admin, getScheduleById)
router.post('/schedule', verifyUser, admin, createSchedule)
router.patch('/schedule/:id', verifyUser, admin, updateSchedule)
router.delete('/schedule/:id', verifyUser, admin, deleteSchedule)

export default router