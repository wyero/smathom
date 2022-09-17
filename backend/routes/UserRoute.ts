import express from 'express'
import {
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers
} from '../controller/UserController'

import { verifyUser, admin } from '../middleware/AuthUser'

const router = express.Router()

router.get('/users', verifyUser, admin, getUsers)
router.get('/users/:id', verifyUser, admin, getUsersById)
router.post('/users', verifyUser, admin, createUsers)
router.patch('/users/:id', verifyUser, admin, updateUsers)
router.delete('/users/:id', verifyUser, admin, deleteUsers)

export default router