const db = require('../models')

export const verifyUser = async (req: any, res: any, next: any) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Silahkan Login Terlebih Dahulu"})
    }
    const user = await db.User.findOne({
        where: {
            id: req.session.userId
        }
    })
    if(!user) return res.status(404).json({msg: "Pengguna Tidak Ditemukan"})
    req.userId = user.id
    req.role = user.role
    next();
}

export const admin = async (req: any, res: any, next: any) => {
    const user = await db.User.findOne({
        where: {
            id: req.session.userId
        }
    })
    if(!user) return res.status(404).json({msg: "Pengguna Tidak DItemukan"})
    if(user.role !== "Admin") return res.status(403).json({msg: "Akses Di Tolak"})
    next()
}