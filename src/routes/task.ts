import express from "express"
import { createTask, deleteTask, getTask, getTaskDetail, moveTask, updateTask } from "@/controllers/task"
import { authenticate } from '@/middlewares/authentication';
import { boardMemberAccess } from "@/middlewares/boardMemberAccess";
import { listMemberAccess } from "@/middlewares/listMemberAccess";
import { taskMemberAccess } from '@/middlewares/taskMemberAccess';

const route = express.Router()

route.get('/task/:board_id/:list_id', authenticate, boardMemberAccess, listMemberAccess, getTask)
route.get('/task/:board_id/:list_id/:task_id', authenticate, boardMemberAccess, listMemberAccess, taskMemberAccess, getTaskDetail)
route.post('/task/:board_id/:list_id', authenticate, boardMemberAccess, listMemberAccess, createTask)
route.put('/task/:board_id/:list_id/:task_id', authenticate, boardMemberAccess, listMemberAccess, taskMemberAccess, updateTask)
route.delete('/task/:board_id/:list_id/:task_id', authenticate, boardMemberAccess, listMemberAccess, taskMemberAccess, deleteTask)
route.patch('/task/move/:board_id/:list_id/:task_id', authenticate, boardMemberAccess, listMemberAccess, taskMemberAccess, moveTask)

export default route