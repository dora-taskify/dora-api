import { handleCreateItem, handleDeleteItem, handleIsDoneItem, handleUpdateItem } from "@/services/item";
import { Request, Response } from "express";

export async function createItem(req: Request, res: Response) {
    try {
        const task_id = (req as any).task.id;
        const { content } = req.body;
        const result = await handleCreateItem(task_id, content);
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "get item success",
            data: result
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "get item error " + err.message
        });
    }
}

export async function updateItem(req: Request, res: Response) {
    try {
        const task_id = (req as any).task.id;
        const item_id = (req as any).item.id;
        const { content } = req.body;
        const result = await handleUpdateItem(task_id, item_id, content);
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "update item success",
            data: result
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "update item error " + err.message
        });
    }
}

export async function isDoneItem(req: Request, res: Response) {
    try {
        const task_id = (req as any).task.id;
        const item_id = (req as any).item.id;
        const result = await handleIsDoneItem(task_id, item_id);
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "update item success",
            data: result
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "update item error " + err.message
        });
    }
}

export async function DeleteItem(req: Request, res: Response) {
    try {
        const task_id = (req as any).task.id;
        const item_id = (req as any).item.id;
        const result = await handleDeleteItem(task_id, item_id);
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "delete item success",
            data: result
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "delete item error " + err.message
        });
    }
}