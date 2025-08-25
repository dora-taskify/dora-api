import { handleArchieveBoard, handleCreateBoard, handleDeleteBoard, handleGetBoard, handleGetBoardDetail, handleUpdateBoard } from "@/services/board";
import { Request, Response } from "express";

export async function getBoard(req: Request, res: Response) {
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
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "get board error " + err.message
        });
    }
}

export async function getBoardDetail(req: Request, res: Response) {
    try {
        const email = (req as any).user.email;
        const { id } = req.params;
        const result = await handleGetBoardDetail(email, Number(id));
        if (!result) {
            throw Error("board not found")
        }
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "get board detail success",
            data: result
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "get board detail error " + err.message
        });
    }
}

export async function createBoard(req: Request, res: Response) {
    try {
        const email = (req as any).user.email;
        const { name } = req.body
        await handleCreateBoard(email, name);
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "create board success",
        })
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "create board error " + err.message
        })
    }
}

export async function updateBoard(req: Request, res: Response) {
    try {
        const email = (req as any).user.email;
        const { name } = req.body;
        const { id } = req.params;
        const result = await handleUpdateBoard(email, Number(id), name)
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "update board success",
            data: result
        })
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "update board error " + err.message
        })
    }
}

export async function archieveBoard(req: Request, res: Response) {
    try {
        const email = (req as any).user.email;
        const { id } = req.params;
        const result = await handleArchieveBoard(email, Number(id))
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "archieve board success",
            data: result
        })
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "archieve board error " + err.message
        })
    }
}

export async function deleteBoard(req: Request, res: Response) {
    try {
        const email = (req as any).user.email;
        const { id } = req.params;
        await handleDeleteBoard(email, Number(id))
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "delete board success",
        })
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "delete board error " + err.message
        })
    }
}