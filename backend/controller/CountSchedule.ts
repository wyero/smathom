const db = require('../models')
import sequelize from 'sequelize'

export const dataCount = async (req: any, res: any) => {
    try {
        const response = await db.Schedule.findAll({
            attributes: [
                  [sequelize.fn('COUNT', sequelize.col('hari')), 'data']
            ]
        })
        res.status(200).json(response)
    } catch (error: any) {
        console.log({msg: error.message})
    }
}