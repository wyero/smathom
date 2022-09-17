import { response } from "express"

const db = require('../models')

export const getSchedule = async (req: any, res: any) => {
   try {
    const schedule = await db.Schedule.findAll()
    res.status(200).json(schedule)
   } catch (error: any) {
    console.log({msg: error.message})
   }
}

export const getScheduleById = async (req: any, res: any) => {
    try {
        const schedule = await db.Schedule.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(schedule)
    } catch (error) {
        
    }
}

export const createSchedule = async (req: any, res: any) => {
    const {hari, mulai, selesai, matpel} = req.body
    try {
        await db.Schedule.create({
            hari: hari,
            mulai: mulai,
            selesai: selesai,
            matpel: matpel
        })
        res.status(200).json({msg: "Jadwal Berhasil Ditambah"})
    } catch (error: any) {
        console.log({msg: error.message})
    }
}

export const updateSchedule = async (req: any, res: any) => {
    try {
        await db.Schedule.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Jadwal Berhasil Di Update"})
    } catch (error: any) {
        console.log({msg: error.message})
    }
}

export const deleteSchedule = async (req: any, res: any) => {
    try {
        await db.Schedule.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Jadwal Berhasil Dihapus"})
    } catch (error: any) {
        console.log({msg: error.message})
    }
}