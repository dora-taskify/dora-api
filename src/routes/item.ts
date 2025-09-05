import express from "express"
import { createItem, DeleteItem, isDoneItem, updateItem } from "@/controllers/item"
import { authenticate } from '@/middlewares/authentication';
import { boardMemberAccess } from '@/middlewares/boardMemberAccess';
import { listMemberAccess } from '@/middlewares/listMemberAccess';
import { taskMemberAccess } from '@/middlewares/taskMemberAccess';
import { itemMemberAccess } from "@/middlewares/itemMemberAccess";
import { errorHandler } from "@/middlewares/errorHandler";

const route = express.Router()

route.post('/item/:board_id/:list_id/:task_id', authenticate, boardMemberAccess, listMemberAccess, taskMemberAccess, createItem, errorHandler)
route.patch('/item/:board_id/:list_id/:task_id/:item_id', authenticate, boardMemberAccess, listMemberAccess, taskMemberAccess, itemMemberAccess, isDoneItem, errorHandler)
route.patch('/item/update/:board_id/:list_id/:task_id/:item_id', authenticate, boardMemberAccess, listMemberAccess, taskMemberAccess, itemMemberAccess, updateItem, errorHandler)
route.delete('/item/:board_id/:list_id/:task_id/:item_id', authenticate, boardMemberAccess, listMemberAccess, taskMemberAccess, itemMemberAccess, DeleteItem, errorHandler)


export default route