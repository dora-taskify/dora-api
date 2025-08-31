import { Request, Response, NextFunction } from "express";
import prisma from "@/lib/prisma";

export async function boardMemberAccess(req: Request, res: Response, next: NextFunction) {
    try {
        const { board_id } = req.params;
        const email = (req as any).user.email
        if (!email) {
            throw Error("email is required")
        }
        if (!board_id) {
            throw Error("board id is required")
        }

        const profile = await prisma.profile.findUnique({
            where: {
                email
            }
        })

        if (!profile) {
            throw Error("user not found")
        }

        const board = await prisma.board.findUnique({
            where: {
                id: Number(board_id),
            },
            include: {
                board_member: true
            }
        })

        if (!board) {
            throw Error("board not found")
        }

        const isOwner = board.created_by === profile.id
        const isMember = board.board_member.some(m => m.profile_id === profile.id)

        if (!isOwner && !isMember) {
            throw new Error("no access to this board");
        }

        (req as any).profile = profile;
        (req as any).board = board;
        (req as any).isOwner = isOwner;
        (req as any).isMember = isMember;

        next();
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "Board member access denied: " + err.message
        });
    }
}