import express from "express"
import { authenticate } from '@/middlewares/authentication';
import { archieveBoard, createBoard, deleteBoard, getBoard, getBoardDetail, updateBoard } from "@/controllers/board"
import { boardMemberAccess } from '@/middlewares/boardMemberAccess';

const route = express.Router()

route.get('/board', authenticate, getBoard)
route.get('/board/:id', authenticate, getBoardDetail)
route.post('/board', authenticate, createBoard)
route.patch('/board/:id', authenticate, updateBoard)
route.patch('/archieve-board/:id', authenticate, archieveBoard)
route.delete('/delete/:id', authenticate, deleteBoard)


export default route