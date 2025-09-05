import express from "express"
import { authenticate } from '@/middlewares/authentication';
import { archieveBoard, createBoard, deleteBoard, getBoard, getBoardDetail, updateBoard } from "@/controllers/board"
import { boardMemberAccess } from '@/middlewares/boardMemberAccess';
import { errorHandler } from "@/middlewares/errorHandler";

const route = express.Router()

route.get('/board', authenticate, getBoard, errorHandler)
route.get('/board/:board_id', authenticate, boardMemberAccess, getBoardDetail, errorHandler)
route.post('/board', authenticate, createBoard, errorHandler)
route.patch('/board/:board_id', authenticate, boardMemberAccess, updateBoard, errorHandler)
route.patch('/archieve-board/:board_id', authenticate, boardMemberAccess, archieveBoard, errorHandler)
route.delete('/delete/:board_id', authenticate, boardMemberAccess, deleteBoard, errorHandler)

export default route