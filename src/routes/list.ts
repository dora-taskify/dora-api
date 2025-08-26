import { archieveList, createList, deleteList, getListDetail, updateList } from "@/controllers/list"
import { authenticate } from "@/middlewares/authentication"
import { boardAccess } from "@/middlewares/boardAccess"
import express from "express"

const route = express.Router()

route.get('/list/', authenticate, boardAccess, getListDetail)
route.post('/list', authenticate, boardAccess, createList)
route.put('/list/', authenticate, boardAccess, updateList)
route.patch('/list/', authenticate, boardAccess, archieveList)
route.delete('/list/', authenticate, boardAccess, deleteList)

export default route