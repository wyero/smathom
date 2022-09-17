const db = require('../models')
import argon2 from 'argon2'

export const login = async (req: any, res: any) => {
    const user = await db.User.findOne({
        where: {
            email: req.body.email
        }
    })
    if(!user) return res.status(404).json({msg: "Pengguna Tidak Ditemukan"})
    const match = await argon2.verify(user.password, req.body.password)
    if(!match) return res.status(400).json({msg: "Email atau Password Salah"})
    req.session.userId = user.id
    const nama = user.nama
    const email = user.email
    const role = user.role
    res.status(200).json(nama, email, role)
}

export const me = async (req: any, res: any) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Silahkan Login Terlebih Dahulu"})
    }
    const user = await db.User.findOne({
        attributes: ['id', 'nama', 'email', 'role'],
        where: {
            id: req.session.userId
        }
    })
    if(!user) return res.status(404).json({msg: "Pengguna Tidak Ditemukan"})
    res.status(200).json(user)
}

export const logout = async (req: any, res: any) => {
    req.session.destroy((error: any) => {
        if(error) return res.status(400).json({msg: "Tidak Dapat Keluar"})
        res.status(200).json({msg: "Berhasil Logout"})
    })
}