import express from "express";
import { deleteMemberBoard, inviteMemberBoard, memberBoard } from "@/controllers/member";
import { boardMemberAccess } from "@/middlewares/boardMemberAccess";
import { authenticate } from '@/middlewares/authentication';

const route = express.Router()

route.post('/member/:board_id', authenticate, boardMemberAccess, inviteMemberBoard)
route.get('/member/:board_id', authenticate, boardMemberAccess, memberBoard)
route.delete('/member/:board_id/:member_id', authenticate, boardMemberAccess, deleteMemberBoard)

export default route