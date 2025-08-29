import { createItem, DeleteItem, isDoneItem, updateItem } from "@/controllers/item"
import express from "express"
import { authenticate } from '../middlewares/authentication';
import { taskAccess } from "@/middlewares/taskAccess";

const route = express.Router()

route.use(authenticate, taskAccess)

route.post('/item', createItem)
route.patch('/item/:id', isDoneItem)
route.patch('/item-update/:id', updateItem)
route.delete('/item/:id', DeleteItem)


export default route