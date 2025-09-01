import prisma from "@/lib/prisma";

export async function handleGetTask(list_id: number) {
    const data = prisma.task.findMany({
        where: {
            list_id
        }
    })

    return data
}

export async function handleGetTaskDetail(taks_id: number) {
    const data = prisma.task.findUnique({
        where: {
            id: taks_id
        }
    })

    return data
}

export async function handleCreateTask(list_id: number, name: string, description: string, position: number, deadline: string) {
    const maxTask = await prisma.task.findFirst({
        where: { list_id },
        orderBy: { position: "desc" }
    })

    const newPosition = maxTask ? maxTask.position + 1 : 1
    const data = prisma.task.create({
        data: {
            list_id,
            name,
            description,
            position: newPosition,
            deadline
        }
    })

    return data
}

export async function handleUpdateTask(task_id: number, name: string, description: string) {
    const data = prisma.task.update({
        where: {
            id: task_id
        },
        data: {
            name,
            description
        }
    })

    return data
}

export async function handleDeleteTask(list_id: number, task_id: number) {
    const data = await prisma.$transaction(async (tx) => {
        const data = await prisma.task.delete({
            where: {
                id: task_id
            }
        })

        await tx.task.updateMany({
            where: {
                list_id,
                position: { gt: data.position },
            },
            data: {
                position: { decrement: 1 }
            }
        })
    })

    return data
}

export async function handleMoveTask(board_id: number, task_id: number, destinationListId: number, newPosition: number) {
    const data = await prisma.$transaction(async (tx) => {
        const list = await prisma.list.findUnique({
            where: {
                id: destinationListId
            }
        })

        if (!list) {
            throw Error("destination list is invalid")
        }

        if (list.board_id !== board_id) {
            throw Error("list destination is not found")
        }

        const taskToMove = await tx.task.findUnique({
            where: { id: task_id },
        });

        if (!taskToMove) {
            throw Error('task not found');
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
            where: { id: task_id },
            data: {
                list_id: destinationListId,
                position: newPosition,
            },
        });

        return updatedTask;
    });

    return data;
}