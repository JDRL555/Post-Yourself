import 'dotenv/config'
import express        from "express"
import homeRouter     from './routes/home.routes.js'
import registerRouter from './routes/register.routes.js'
import { connection } from './database/db.js'

const port = process.env.PORT || 5000
const app = express()
app.use(express.json())

app.use(homeRouter)
app.use(registerRouter)


app.listen(port, ()=>{
  connection.connect(err => err ? console.error(err) : console.log(`connected to the database and running on http://localhost:${port}`))
})