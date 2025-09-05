import express from "express"
import { createTask, deleteTask, getTask, getTaskDetail, moveTask, updateTask } from "@/controllers/task"
import { authenticate } from '@/middlewares/authentication';
import { boardMemberAccess } from "@/middlewares/boardMemberAccess";
import { listMemberAccess } from "@/middlewares/listMemberAccess";
import { taskMemberAccess } from '@/middlewares/taskMemberAccess';
import { errorHandler } from "@/middlewares/errorHandler";

const route = express.Router()

route.get('/task/:board_id/:list_id', authenticate, boardMemberAccess, listMemberAccess, getTask, errorHandler)
route.get('/task/:board_id/:list_id/:task_id', authenticate, boardMemberAccess, listMemberAccess, taskMemberAccess, getTaskDetail, errorHandler)
route.post('/task/:board_id/:list_id', authenticate, boardMemberAccess, listMemberAccess, createTask, errorHandler)
route.put('/task/:board_id/:list_id/:task_id', authenticate, boardMemberAccess, listMemberAccess, taskMemberAccess, updateTask, errorHandler)
route.delete('/task/:board_id/:list_id/:task_id', authenticate, boardMemberAccess, listMemberAccess, taskMemberAccess, deleteTask, errorHandler)
route.patch('/task/move/:board_id/:list_id/:task_id', authenticate, boardMemberAccess, listMemberAccess, taskMemberAccess, moveTask, errorHandler)

export default route