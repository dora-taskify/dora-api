import prisma from "@/lib/prisma";

export async function handleCreateItem(task_id: number, content: string) {
    const data = await prisma.item.create({
        data: {
            content,
            task_id
        }
    });

    if (!data) {
        throw {
            code: 400,
            message: "failed to create item"
        };
    }

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
    });

    if (!data) {
        throw {
            code: 404,
            message: "item not found"
        };
    }

    return data;
}

export async function handleIsDoneItem(task_id: number, id: number) {
    const item = await prisma.item.findUnique({
        where: {
            id,
            task_id
        }
    });

    if (!item) {
        throw {
            code: 404,
            message: "item not found"
        };
    }

    if (!item.is_done) {
        const data = await prisma.item.update({
            where: { id },
            data: { is_done: true }
        });

        if (!data) {
            throw {
                code: 400,
                message: "failed to update item"
            };
        }

        return data;
    }

    if (item.is_done) {
        const data = await prisma.item.update({
            where: { id },
            data: { is_done: false }
        });

        if (!data) {
            throw {
                code: 400,
                message: "failed to update item"
            };
        }

        return data;
    }
}

export async function handleDeleteItem(task_id: number, item_id: number) {
    const data = await prisma.item.delete({
        where: {
            id: item_id,
            task_id
        }
    });

    if (!data) {
        throw {
            code: 404,
            message: "item not found"
        };
    }

    return data;
}