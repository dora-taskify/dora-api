import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

import { corsMiddleware } from "@/middlewares/cors"

import routeAuth from "@/routes/auth"
import routeBoard from "@/routes/board"
import routeList from "@/routes/list"
import routeTask from "@/routes/task"
import routeItem from "@/routes/item"
import routeMember from "@/routes/member"
import routeNotification from "@/routes/notification"
import "@/jobs/deadlineReminder"

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(corsMiddleware)

app.use('/api/v1', routeAuth)
app.use('/api/v1', routeBoard)
app.use('/api/v1', routeList)
app.use('/api/v1', routeTask)
app.use('/api/v1', routeItem)
app.use('/api/v1', routeMember)
app.use("/api/v1", routeNotification);


app.listen(PORT, () => {
    console.log(`server listening on PORT ${PORT}`)
})