import express from "express"
import { archieveList, createList, deleteList, getListDetail, updateList } from "@/controllers/list"
import { authenticate } from "@/middlewares/authentication"
import { boardMemberAccess } from "@/middlewares/boardMemberAccess"
import { listMemberAccess } from '@/middlewares/listMemberAccess';
import { errorHandler } from "@/middlewares/errorHandler";

const route = express.Router()

route.get('/list/:board_id/:list_id', authenticate, boardMemberAccess, getListDetail, errorHandler)
route.post('/list/:board_id', authenticate, boardMemberAccess, createList, errorHandler)
route.put('/list/:board_id/:list_id', authenticate, boardMemberAccess, listMemberAccess, updateList, errorHandler)
route.patch('/list/:board_id/:list_id', authenticate, boardMemberAccess, listMemberAccess, archieveList, errorHandler)
route.delete('/list/:board_id/:list_id', authenticate, boardMemberAccess, listMemberAccess, deleteList, errorHandler)

export default route