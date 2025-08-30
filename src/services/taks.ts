import prisma from "@/lib/prisma";

export function handleGetTask(list_id: number) {
    const data = prisma.task.findMany({
        where: {
            list_id
        }
    })

    return data
}

export function handleGetTaskDetail(list_id: number, taks_id: number) {
    const data = prisma.task.findUnique({
        where: {
            id: taks_id,
            list_id
        }
    })

    return data
}

export function handleCreateTask(list_id: number, name: string, description: string, position: number, deadline: string) {
    const data = prisma.task.create({
        data: {
            list_id,
            name,
            description,
            position,
            deadline
        }
    })

    return data
}

export function handleUpdateTask(list_id: number, task_id: number, name: string, description: string) {
    const data = prisma.task.update({
        where: {
            id: task_id,
            list_id
        },
        data: {
            name,
            description
        }
    })

    return data
}

export function handleDeleteTask(list_id: number, task_id: number) {
    const data = prisma.task.delete({
        where: {
            id: task_id,
            list_id
        }
    })

    return data
}

export async function handleMoveTask(taskId: number, destinationListId: number, newPosition: number) {
    const data = await prisma.$transaction(async (tx) => {
        const taskToMove = await tx.task.findUnique({
            where: { id: taskId },
        });

        if (!taskToMove) {
            throw new Error('task not found');
        }

        const sourceListId = taskToMove.list_id;
        const oldPosition = taskToMove.position;

        await tx.task.updateMany({
            where: {
                list_id: sourceListId,
                position: { gt: oldPosition },
            },
            data: {
                position: { decrement: 1 },
            },
        });

        await tx.task.updateMany({
            where: {
                list_id: destinationListId,
                position: { gte: newPosition },
            },
            data: {
                position: { increment: 1 },
            },
        });

        const updatedTask = await tx.task.update({
            where: { id: taskId },
            data: {
                list_id: destinationListId,
                position: newPosition,
            },
        });

        return updatedTask;
    });

    return data;
}