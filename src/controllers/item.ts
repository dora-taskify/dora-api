import { handleCreateItem, handleDeleteItem, handleIsDoneItem, handleUpdateItem } from "@/services/item";
import { Request, Response } from "express";

export async function createItem(req: Request, res: Response) {
    try {
        const task = (req as any).task;
        const { content } = req.body;
        const result = await handleCreateItem(Number(task.id), content);
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
        const task = (req as any).task;
        const { id } = req.params;
        const { content } = req.body;
        const result = await handleUpdateItem(Number(task.id), Number(id), content);
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
        const task = (req as any).task;
        console.log(task)
        const { id } = req.params;
        console.log(id)
        const result = await handleIsDoneItem(Number(task.id), Number(id));
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
        const task = (req as any).task;
        const { id } = req.params;
        const result = await handleDeleteItem(Number(task.id), Number(id));
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