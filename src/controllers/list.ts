import { handleArchieveList, handleCreateList, handleDeleteList, handleGetListDetail, handleUpdateList } from "@/services/list";
import { Request, Response } from "express";

export async function getListDetail(req: Request, res: Response) {
    try {
        const email = (req as any).user.email;
        const { board_id, list_id } = req.query
        const result = await handleGetListDetail(Number(board_id), email, Number(list_id))
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "get list detail success",
            data: result
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "get list detail error " + err.message
        });
    }
}

export async function createList(req: Request, res: Response) {
    try {
        const { name, description } = req.body;
        const { board_id } = req.query;
        const email = (req as any).user.email;
        const result = await handleCreateList(email, name, description, Number(board_id))
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "create list success",
            data: result
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "create list error " + err.message
        });
    }
}

export async function updateList(req: Request, res: Response) {
    try {
        const { name, description } = req.body;
        const { board_id, list_id } = req.query;
        const email = (req as any).user.email;
        const result = await handleUpdateList(email, Number(board_id), Number(list_id), name, description)
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "update list success",
            data: result
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "update list error " + err.message
        });
    }
}

export async function archieveList(req: Request, res: Response) {
    try {
        const { board_id, list_id } = req.query;
        const email = (req as any).user.email;
        const result = await handleArchieveList(email, Number(board_id), Number(list_id))
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "archieve list success",
            data: result
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "archieve list error " + err.message
        });
    }
}

export async function deleteList(req: Request, res: Response) {
    try {
        const { board_id, list_id } = req.query;
        const email = (req as any).user.email;
        await handleDeleteList(Number(board_id), email, Number(list_id));
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "delete list success"
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "delete list error " + err.message
        });
    }
}