import express from "express"
import { Request, Response } from "express"
import { loginAuth, registerAuth, logoutAuth } from "@/controllers/auth"
import { authenticate } from "@/middlewares/authentication"
import { errorHandler } from "@/middlewares/errorHandler"

const route = express.Router()

route.post('/register', registerAuth, errorHandler)
route.post('/login', loginAuth, errorHandler)
route.post('/logout', logoutAuth, errorHandler)
route.get('/user', authenticate, (req: Request, res: Response) => {
    const user = (req as any).user;
    res.json(user)
})

export default route