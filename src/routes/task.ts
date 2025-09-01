import { createTask, deleteTask, dragTask, getTask, getTaskDetail, updateTask } from "@/controllers/task"
import express from "express"
import { authenticate } from '@/middlewares/authentication';
import { listAccess } from "@/middlewares/listAccess";

const route = express.Router()

route.use(authenticate, listAccess)

route.get('/task', getTask) // oke
route.get('/task/:id', getTaskDetail) 
route.post('/task', createTask) // oke
route.patch('/task/:id', updateTask) //oke
route.delete('/task/:id', deleteTask) 
route.patch("/task/:id/drag", dragTask); // oke

export default route