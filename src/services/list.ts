import prisma from "@/lib/prisma";

export async function handleGetListDetail(list_id: number) {
    const result = await prisma.list.findUnique({
        where: {
            id: list_id,
        }
    });

    return result
}
export async function handleCreateList(board_id: number, name: string, description: string) {
    const result = await prisma.list.create({
        data: {
            name,
            description,
            board_id
        }
    });

    return result;
}

export async function handleUpdateList(list_id: number, name: string, description: string) {
    const result = await prisma.list.update({
        where: {
            id: list_id
        },
        data: {
            name,
            description
        }
    });

    return result;
}

export async function handleArchieveList(list_id: number) {
    const data = await prisma.list.findUnique({
        where: {
            id: list_id
        }
    })

    if (!data?.is_archieved) {
        const result = await prisma.list.update({
            where: {
                id: list_id
            },
            data: {
                is_archieved: true
            }
        });
        return result;
    }
    if (data?.is_archieved) {
        const result = await prisma.list.update({
            where: {
                id: list_id
            },
            data: {
                is_archieved: false
            }
        });
        return result;
    }
}

export async function handleDeleteList(board_id: number, list_id: number) {
    await prisma.list.delete({
        where: {
            id: list_id,
            is_archieved: true,
            board_id
        }
    })
}