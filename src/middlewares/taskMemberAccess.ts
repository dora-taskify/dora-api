import { Request, Response, NextFunction } from "express";
import prisma from "@/lib/prisma";

export async function taskMemberAccess(req: Request, res: Response, next: NextFunction) {
    try {
        const list_id = (req as any).list.id
        const { task_id } = req.params;
        if (!task_id) {
            throw Error("task id is required")
        }

        const task = await prisma.task.findUnique({
            where: {
                id: Number(task_id),
                list_id
            }
        })

        if (!task) {
            throw Error("task not found")
        }

        (req as any).task = task;
        next();
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "Board member access denied: " + err.message
        });
    }
}