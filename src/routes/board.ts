import express from "express"
import { authenticate } from '@/middlewares/authentication';
import { archieveBoard, createBoard, deleteBoard, getBoard, getBoardDetail, updateBoard } from "@/controllers/board"
import { boardMemberAccess } from '@/middlewares/boardMemberAccess';

const route = express.Router()

route.get('/board', authenticate, getBoard)
route.get('/board/:board_id', authenticate, boardMemberAccess, getBoardDetail)
route.post('/board', authenticate, createBoard)
route.patch('/board/:board_id', authenticate, boardMemberAccess, updateBoard)
route.patch('/archieve-board/:board_id', authenticate, boardMemberAccess, archieveBoard)
route.delete('/delete/:board_id', authenticate, boardMemberAccess, deleteBoard)

export default route