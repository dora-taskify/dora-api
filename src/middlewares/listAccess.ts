import { Request, Response, NextFunction } from "express";
import prisma from "@/lib/prisma";

export async function listAccess(req: Request, res: Response, next: NextFunction) {
    try {
        const { board_id, list_id } = req.query;
        const email = (req as any).user.email;

        if (!email) {
            throw Error("email is required")
        }
        if (!board_id) {
            throw Error("board id is required")
        }
        if (!list_id) {
            throw Error("list id is required")
        }

        const profile = await prisma.profile.findUnique({
            where: {
                email
            }
        });

        if (!profile) {
            throw Error("user not found")
        }

        const board = await prisma.board.findUnique({
            where: {
                id: Number(board_id),
                created_by: profile.id
            },
        });

        if (!board) {
            throw Error("board not found")
        }

        const list = await prisma.list.findUnique({
            where: {
                id: Number(list_id)
            }
        });

        if (!list) {
            throw Error("list not found")
        }

        (req as any).profile = profile;
        (req as any).board = board;
        (req as any).list = list;
        next();
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "board access error " + err.message
        });
    }
}
