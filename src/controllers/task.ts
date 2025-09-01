import prisma from "@/lib/prisma";
import { handleCreateTask, handleDeleteTask, handleGetTask, handleGetTaskDetail, handleMoveTask, handleUpdateTask } from "@/services/taks";
import { Request, Response } from "express";

export async function getTask(req: Request, res: Response) {
    try {
        const list = (req as any).list
        const result = await handleGetTask(Number(list.id))
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "get task success",
            data: result
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "get task error " + err.message
        });
    }
}

export async function getTaskDetail(req: Request, res: Response) {
    try {
        const task_id = (req as any).task.id;
        const result = await handleGetTaskDetail(Number(task_id))
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "get task detail success",
            data: result
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "get task detail error " + err.message
        });
    }
}

export async function createTask(req: Request, res: Response) {
    try {
        const list_id = (req as any).list.id
        const { name, description, position, deadline } = req.body;
        const result = await handleCreateTask(list_id, name, description, position, deadline)
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "create task success",
            data: result
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "create task error " + err.message
        });
    }
}

export async function updateTask(req: Request, res: Response) {
    try {
        const task_id = (req as any).task.id;
        const { name, description } = req.body;
        const result = await handleUpdateTask(task_id, name, description)
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "update task success",
            data: result
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "update task error " + err.message
        });
    }
}

export async function deleteTask(req: Request, res: Response) {
    try {
        const list_id = (req as any).list.id;
        const task_id = (req as any).task.id;
        const result = await handleDeleteTask(list_id, task_id)
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "delete task success",
            data: result
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "get task error " + err.message
        });
    }
}

export async function moveTask(req: Request, res: Response) {
    try {
        const task_id = (req as any).task.id;
        const board_id = (req as any).board.id;
        const { destinationListId, newPosition } = req.body;
        const result = await handleMoveTask(board_id, task_id, Number(destinationListId), Number(newPosition));
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "Move task success",
            data: result,
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "Move task error: " + err.message,
        });
    }
}