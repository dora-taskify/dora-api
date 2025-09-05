import prisma from "@/lib/prisma";
import { handleGetNotification, handleReadNotification } from "@/services/notification";
import { Request, Response, NextFunction } from "express";

export async function getNotification(req: Request, res: Response, next: NextFunction) {
    try {
        const user = (req as any).user;

        const profile = await prisma.profile.findUnique({
            where: { email: user.email },
        });

        if (!profile) {
            throw { code: 404, message: "Profile not found" };
        }

        const notifications = await handleGetNotification(Number(profile.id))

        return res.status(200).json({
            code: 200,
            status: "success",
            data: notifications,
        });
    } catch (err: any) {
        next(err);
    }
}

export async function readNotification(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const user = (req as any).user;

        const profile = await prisma.profile.findUnique({
            where: { email: user.email },
        });

        if (!profile) {
            throw { code: 404, message: "Profile not found" };
        }

        const updated = await handleReadNotification(Number(id), Number(profile.id))

        return res.status(200).json({
            code: 200,
            status: "success",
            data: updated,
        });
    } catch (err: any) {
        next(err);
    }
}