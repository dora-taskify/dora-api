import { createTask, deleteTask, getTask, getTaskDetail, updateTask } from "@/controllers/task"
import express from "express"
import { authenticate } from '@/middlewares/authentication';
import { listAccess } from "@/middlewares/listAccess";

const route = express.Router()

route.use(authenticate, listAccess)

route.get('/task', getTask)
route.get('/task/:id', getTaskDetail)
route.post('/task', createTask)
route.put('/task/:id', updateTask)
route.delete('/task/:id', deleteTask)

export default route