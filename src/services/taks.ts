import { label } from "@/generated/prisma";
import prisma from "@/lib/prisma";

export async function handleGetTask(list_id: number, prio?: label, sortDeadline?: "asc" | "desc") {
    const data = await prisma.task.findMany({
        where: {
            list_id,
            ...(prio && { priority: prio })
        },
        orderBy: {
            deadline: sortDeadline
        }
    });

    return data;
}

export async function handleGetTaskDetail(task_id: number) {
    const data = await prisma.task.findUnique({
        where: { id: task_id },
        include: { item: true }
    });

    if (!data) {
        throw {
            code: 404,
            message: "task not found"
        };
    }

    return data;
}

export async function handleCreateTask(list_id: number, name: string, description: string, deadline: string, priority: label) {
    const maxTask = await prisma.task.findFirst({
        where: { list_id },
        orderBy: { position: "desc" }
    });

    const newPosition = maxTask ? maxTask.position + 1 : 1;

    const data = await prisma.task.create({
        data: {
            list_id,
            name,
            description,
            position: newPosition,
            deadline,
            priority
        }
    });

    if (!data) {
        throw {
            code: 400,
            message: "failed to create task"
        };
    }

    return data;
}

export async function handleUpdateTask(task_id: number, name: string, description: string, priority: label) {
    const data = await prisma.task.update({
        where: { id: task_id },
        data: { name, description, priority }
    });

    if (!data) {
        throw {
            code: 404,
            message: "task not found"
        };
    }

    return data;
}

export async function handleDeleteTask(list_id: number, task_id: number) {
    const data = await prisma.$transaction(async (tx) => {
        const deletedTask = await tx.task.delete({
            where: { id: task_id }
        });

        if (!deletedTask) {
            throw {
                code: 404,
                message: "task not found"
            };
        }

        await tx.task.updateMany({
            where: {
                list_id,
                position: { gt: deletedTask.position }
            },
            data: {
                position: { decrement: 1 }
            }
        });

        return deletedTask;
    });

    return data;
}

export async function handleMoveTask(board_id: number, task_id: number, destinationListId: number, newPosition: number) {
    const data = await prisma.$transaction(async (tx) => {
        const list = await tx.list.findUnique({
            where: { id: destinationListId }

        });

        if (!list) {
            throw {
                code: 404,
                message: "destination list is invalid"
            };
        }

        if (list.board_id !== board_id) {
            throw {
                code: 404,
                message: "list destination is not found"
            };
        }

        const taskToMove = await tx.task.findUnique({ where: { id: task_id } });

        if (!taskToMove) {
            throw {
                code: 404,
                message: "task not found"
            };
        }

        const sourceListId = taskToMove.list_id;
        const oldPosition = taskToMove.position;

        await tx.task.updateMany({
            where: { list_id: sourceListId, position: { gt: oldPosition } },
            data: { position: { decrement: 1 } }
        });

        await tx.task.updateMany({
            where: { list_id: destinationListId, position: { gte: newPosition } },
            data: { position: { increment: 1 } }
        });

        const updatedTask = await tx.task.update({
            where: { id: task_id },
            data: { list_id: destinationListId, position: newPosition }
        });

        return updatedTask;
    });

    return data;
}