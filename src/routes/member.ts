import { boardMemberAccess } from "@/middlewares/boardMemberAccess";
import express from "express";
import { authenticate } from '../middlewares/authentication';
import { deleteMemberBoard, inviteMemberBoard, memberBoard } from "@/controllers/member";

const route = express.Router()

route.post('/member/:board_id', authenticate, boardMemberAccess, inviteMemberBoard)
route.get('/member/:board_id', authenticate, boardMemberAccess, memberBoard)
route.delete('/member/:board_id/:id', authenticate, boardMemberAccess, deleteMemberBoard)

export default route