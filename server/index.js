import 'dotenv/config'
import express            from "express"
import cors               from 'cors'
import cookieParser       from 'cookie-parser'
import profilesRouter     from './routes/profiles.routes.js'
import homeRouter         from './routes/home.routes.js'

const port = process.env.PORT
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use(homeRouter)
app.use(profilesRouter)

app.listen(port, ()=>console.log(`Server running on port ${port}`))