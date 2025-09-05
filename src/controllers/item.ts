import { handleCreateItem, handleDeleteItem, handleIsDoneItem, handleUpdateItem } from "@/services/item";
import { NextFunction, Request, Response } from "express";

export async function createItem(req: Request, res: Response, next: NextFunction) {
    try {
        const task_id = (req as any).task.id;
        const { content } = req.body;
        const result = await handleCreateItem(task_id, content);
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "create item success",
            data: result
        });
    } catch (err: any) {
        next(err);
    }
}

export async function updateItem(req: Request, res: Response, next: NextFunction) {
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
        next(err);
    }
}

export async function isDoneItem(req: Request, res: Response, next: NextFunction) {
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
        next(err);
    }
}

export async function deleteItem(req: Request, res: Response, next: NextFunction) {
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
        next(err);
    }
}