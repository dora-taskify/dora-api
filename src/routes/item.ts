import express from "express"
import { createItem, DeleteItem, isDoneItem, updateItem } from "@/controllers/item"
import { authenticate } from '@/middlewares/authentication';
import { boardMemberAccess } from '@/middlewares/boardMemberAccess';
import { listMemberAccess } from '@/middlewares/listMemberAccess';
import { taskMemberAccess } from '@/middlewares/taskMemberAccess';
import { itemMemberAccess } from "@/middlewares/itemMemberAccess";

const route = express.Router()

route.post('/item/:board_id/:list_id/:task_id', authenticate, boardMemberAccess, listMemberAccess, taskMemberAccess, createItem)
route.patch('/item/:board_id/:list_id/:task_id/:item_id', authenticate, boardMemberAccess, listMemberAccess, taskMemberAccess, itemMemberAccess, isDoneItem)
route.patch('/item/update/:board_id/:list_id/:task_id/:item_id', authenticate, boardMemberAccess, listMemberAccess, taskMemberAccess, itemMemberAccess, updateItem)
route.delete('/item/:board_id/:list_id/:task_id/:item_id', authenticate, boardMemberAccess, listMemberAccess, taskMemberAccess, itemMemberAccess, DeleteItem)

export default route