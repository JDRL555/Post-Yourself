import 'dotenv/config'
import express            from "express"
import profilesRouter     from './routes/profiles.routes.js'
import homeRouter         from './routes/home.routes.js'

const port = process.env.PORT || 5000
const app = express()
app.use(express.json())

app.use(homeRouter)
app.use(profilesRouter)

app.listen(port, ()=>console.log(`Server running on port ${port}`))