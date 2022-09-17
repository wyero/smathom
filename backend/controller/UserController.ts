const db = require('../models')
import argon2 from 'argon2'

export const getUsers = async (req: any, res: any) => {
    try {
        const users = await db.User.findAll({
            attributes: ['id', 'nama', 'email', 'role']
        })
        res.status(200).json(users)
    } catch (error: any) {
        res.status(500).json({msg: error.message})
    }
}

export const getUsersById = async (req: any, res: any) => {
    try {
        const users = await db.User.findOne({
            attributes: ['id', 'nama', 'email', 'role'],
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(users)
    } catch (error: any) {
        res.status(500).json({msg: error.message})
    }
}

export const createUsers = async (req: any, res: any) => {
    const {nama, email, password, ulangiPassword, role} = req.body
    if(password !== ulangiPassword) return res.status(400).json({msg: "Password Dan Ulangi Password Tidak Cocok"})
    const hashPassword = await argon2.hash(password)
    try {
        await db.User.create({
            nama: nama,
            email: email,
            password: hashPassword,
            role: role
        })
        res.status(200).json({msg: "Pengguna Berhasil Ditambah"})
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}

export const updateUsers = async (req: any, res: any) => {
    const user = await db.User.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!user) return res.status(404).json({msg: "Pengguna Tidak Ditemukan"})
    const {nama, email, password, ulangiPassword, role} = req.body
    let hashPassword
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password)
    }
    if(password !== ulangiPassword) return res.status(400).json({msg: "Password Dan Ulangi Password Tidak Cocok"})
    try {
        await db.User.update({
            nama: nama,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id
            }
        })
        res.status(200).json({msg: "Pengguna Berhasil Di Update"})
    } catch (error: any) {
        res.status(400).json({msg:error.message})
    }
}

export const deleteUsers = async (req: any, res: any) => {
    const user = await db.User.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!user) return res.status(404).json({msg: "Pengguna Tidak Ditemukan"})
    try {
        await db.User.destroy({
            where: {
                id: user.id
            }
        })
        res.status(200).json({msg: "Pengguna Berhasil Dihapus"})
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}