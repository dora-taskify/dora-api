import { Request, Response, NextFunction } from "express";
import prisma from "@/lib/prisma";

export async function listMemberAccess(req: Request, res: Response, next: NextFunction) {
    try {
        const board_id = (req as any).board.id
        const { list_id } = req.params;
        if (!list_id) {
            throw Error("list id is required")
        }

        const list = await prisma.list.findUnique({
            where: {
                id: Number(list_id),
                board_id
            }
        })

        if (!list) {
            throw Error("list not found")
        }

        (req as any).list = list

        next();
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "Board member access denied: " + err.message
        });
    }
}