import { Request, Response, NextFunction } from "express";
import prisma from "@/lib/prisma";

export async function itemMemberAccess(req: Request, res: Response, next: NextFunction) {
    try {
        const task_id = (req as any).task.id
        const { item_id } = req.params;
        if (!item_id) {
            throw Error("item_id is required")
        }

        const item = await prisma.item.findUnique({
            where: {
                id: Number(item_id),
                task_id
            }
        })

        if (!item) {
            throw Error("item not found")
        }

        (req as any).item = item;
        next();
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "Board member access denied: " + err.message
        });
    }
}