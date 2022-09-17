const db = require('../models')
import argon2 from 'argon2'

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

