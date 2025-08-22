import express from "express"
import { loginAuth, registerAuth } from "../controllers/auth"

const route = express.Router()

route.post('/register', registerAuth)
route.post('/login', loginAuth)

export default route