import express from "express"
import { Request, Response } from "express"
import { loginAuth, registerAuth } from "../controllers/auth"
import { authenticate } from "../middlewares/authentication"

const route = express.Router()

route.post('/register', registerAuth)
route.post('/login', loginAuth)
route.get('/user', authenticate, (req: Request, res: Response) => {
    const user = (req as any).user;
    res.json(user)
})

export default route