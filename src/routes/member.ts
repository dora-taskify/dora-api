import express from "express";
import { deleteMemberBoard, inviteMemberBoard, memberBoard } from "@/controllers/member";
import { boardMemberAccess } from "@/middlewares/boardMemberAccess";
import { authenticate } from '@/middlewares/authentication';
import { errorHandler } from "@/middlewares/errorHandler";

const route = express.Router()

route.post('/member/:board_id', authenticate, boardMemberAccess, inviteMemberBoard, errorHandler)
route.get('/member/:board_id', authenticate, boardMemberAccess, memberBoard, errorHandler)
route.delete('/member/:board_id/:member_id', authenticate, boardMemberAccess, deleteMemberBoard, errorHandler)

export default route