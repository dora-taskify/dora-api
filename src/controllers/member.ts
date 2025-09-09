import { Request, Response, NextFunction } from "express";
import { handleDeleteMemberBoard, handleInviteMemberBoard, handleMemberBoard } from "@/services/member";

export async function inviteMemberBoard(req: Request, res: Response, next: NextFunction) {
    try {
        const { board_id } = req.params;
        const { profile_email } = req.body;
        const result = await handleInviteMemberBoard(Number(board_id), profile_email);
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "invite member success",
            data: result,
        });
    } catch (err: any) {
        next(err);
    }
}

export async function memberBoard(req: Request, res: Response, next: NextFunction) {
    try {
        const board_id = (req as any).board.id;
        const result = await handleMemberBoard(Number(board_id));
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "read member success",
            data: result,
        });
    } catch (err: any) {
        next(err);
    }
}

export async function deleteMemberBoard(req: Request, res: Response, next: NextFunction) {
    try {
        const { member_id } = req.params;
        const result = await handleDeleteMemberBoard(Number(member_id));
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "delete member success",
            data: result,
        });
    } catch (err: any) {
        next(err);
    }
}