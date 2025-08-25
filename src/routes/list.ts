import { archieveList, createList, deleteList, getListDetail, updateList } from "@/controllers/list"
import { authenticate } from "@/middlewares/authentication"
import express from "express"

const route = express.Router()

route.get('/list/', authenticate, getListDetail)
route.post('/list', authenticate, createList)
route.put('/list/', authenticate, updateList)
route.patch('/list/', authenticate, archieveList)
route.delete('/list/', authenticate, deleteList)

export default route