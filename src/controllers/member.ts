import { handleDeleteMemberBoard, handleInviteMemberBoard, handleMemberBoard } from "@/services/member";
import { Request, Response } from "express";

export async function inviteMemberBoard(req: Request, res: Response) {
    try {
        const { board_id } = req.params;
        const { profile_id } = req.body;
        const result = await handleInviteMemberBoard(Number(board_id), Number(profile_id));
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "invite member success",
            data: result,
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "invite member error: " + err.message,
        });
    }
}

export async function memberBoard(req: Request, res: Response) {
    try {
        const { board_id } = req.params;
        const result = await handleMemberBoard(Number(board_id));
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "read member success",
            data: result,
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "read member error: " + err.message,
        });
    }
}

export async function deleteMemberBoard(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await handleDeleteMemberBoard(Number(id));
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "delete member success",
            data: result,
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "delete member error: " + err.message,
        });
    }
}