import { handleArchieveBoard, handleCreateBoard, handleDeleteBoard, handleGetBoard, handleGetBoardDetail, handleUpdateBoard } from "@/services/board";
import { NextFunction, Request, Response } from "express";

export async function getBoard(req: Request, res: Response, next: NextFunction) {
    try {
        const email = (req as any).user.email;
        const result = await handleGetBoard(email);
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "get board success",
            data: result
        });
    } catch (err: any) {
        next(err);
    }
}

export async function getBoardDetail(req: Request, res: Response, next: NextFunction) {
    try {
        const board_id = (req as any).board.id;
        const result = await handleGetBoardDetail(board_id);
        if (!result) {
            throw {
                code: 404,
                message: "board not found"
            }
        }
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "get board detail success",
            data: result
        });
    } catch (err: any) {
        next(err);
    }
}

export async function createBoard(req: Request, res: Response, next: NextFunction) {
    try {
        const email = (req as any).user.email;
        const { name } = req.body
        const result = await handleCreateBoard(email, name);
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "create board success",
            data: result
        })
    } catch (err: any) {
        next(err);
    }
}

export async function updateBoard(req: Request, res: Response, next: NextFunction) {
    try {
        const board_id = (req as any).board.id;
        const { name } = req.body;
        const result = await handleUpdateBoard(board_id, name)
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "update board success",
            data: result
        })
    } catch (err: any) {
        next(err);
    }
}

export async function archieveBoard(req: Request, res: Response, next: NextFunction) {
    try {
        const isOwner = (req as any).isOwner;
        if (!isOwner) {
            throw {
                code: 403,
                message: "only owner can archieve this board"
            }
        }
        const board_id = (req as any).board.id;
        const result = await handleArchieveBoard(board_id)
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "archieve board success",
            data: result
        })
    } catch (err: any) {
        next(err);
    }
}

export async function deleteBoard(req: Request, res: Response, next: NextFunction) {
    try {
        const isOwner = (req as any).isOwner;
        if (!isOwner) {
            throw {
                code: 403,
                message: "only owner can delete this board"
            }
        }
        const board_id = (req as any).board.id;
        await handleDeleteBoard(board_id)
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "delete board success",
        })
    } catch (err: any) {
        next(err);
    }
}
