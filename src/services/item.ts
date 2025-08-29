import prisma from "@/lib/prisma";

export async function handleCreateItem(task_id: number, content: string) {
    const data = await prisma.item.create({
        data: {
            content,
            task_id
        }
    })

    return data;
}

export async function handleUpdateItem(task_id: number, item_id: number, content: string) {
    const data = await prisma.item.update({
        where: {
            id: item_id,
            task_id
        },
        data: {
            content
        }
    })

    return data
}

export async function handleIsDoneItem(task_id: number, id: number) {
    const item = await prisma.item.findUnique({
        where: {
            id,
            task_id
        }
    })
    if (!item?.is_done) {
        const data = prisma.item.update({
            where: {
                id
            },
            data: {
                is_done: true
            }
        })

        return data
    }
    if (item.is_done) {
        const data = prisma.item.update({
            where: {
                id
            },
            data: {
                is_done: false
            }
        })

        return data
    }
}

export async function handleDeleteItem(task_id: number, item_id: number) {
    const data = await prisma.item.delete({
        where: {
            id: item_id,
            task_id
        }
    })

    return data
}