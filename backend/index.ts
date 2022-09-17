import express from 'express'
import cors from 'cors'
import session from 'express-session'
import dotenv from 'dotenv'
import UserRoute from './routes/UserRoute'
import AuthRoute from './routes/AuthRoute'
import ScheduleRoute from './routes/ScheduleRoute'
import CountSchedule from './routes/CountSchedule'
import CountUser from './routes/CountUserRoute'
import RegisterRoute from './routes/RegisterRoute'
const db = require("./models")
dotenv.config()

const app = express()

db.sequelize.sync()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}))

app.use(express.json())
app.use(UserRoute)
app.use(AuthRoute)
app.use(ScheduleRoute)
app.use(RegisterRoute)
app.use(CountSchedule)
app.use(CountUser)

app.listen(process.env.APP_PORT, () => {
    console.log("Server Running")
})