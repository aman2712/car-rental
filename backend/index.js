import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import carRoutes from './routes/carRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', carRoutes)
app.use('/api', userRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})