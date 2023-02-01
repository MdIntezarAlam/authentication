import express from 'express'
import connectDB from './database/db.js'
import dotenv from 'dotenv'
import userRouters from './routers/userRouters.js'
import cors from 'cors'
const app = express()



dotenv.config({ path: 'config/.env' })

app.use(express.json())
app.use(cors())
app.use("/api/v1", userRouters)

app.listen(process.env.PORT, () => {
    console.log(`server is listining on localhost ${process.env.PORT}`)
})

connectDB()