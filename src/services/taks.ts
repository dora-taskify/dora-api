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