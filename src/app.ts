import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import routeAuth from "./routes/auth"

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1', routeAuth)


app.listen(PORT, () => {
    console.log(`server listening on PORT ${PORT}`)
})