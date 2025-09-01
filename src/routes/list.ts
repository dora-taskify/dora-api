import express from "express"
import { archieveList, createList, deleteList, getListDetail, updateList } from "@/controllers/list"
import { authenticate } from "@/middlewares/authentication"
import { boardMemberAccess } from "@/middlewares/boardMemberAccess"
import { listMemberAccess } from '@/middlewares/listMemberAccess';

const route = express.Router()

route.get('/list/:board_id/:list_id', authenticate, boardMemberAccess, getListDetail)
route.post('/list/:board_id', authenticate, boardMemberAccess, createList)
route.put('/list/:board_id/:list_id', authenticate, boardMemberAccess, listMemberAccess, updateList)
route.patch('/list/:board_id/:list_id', authenticate, boardMemberAccess, listMemberAccess, archieveList)
route.delete('/list/:board_id/:list_id', authenticate, boardMemberAccess, listMemberAccess, deleteList)

export default route