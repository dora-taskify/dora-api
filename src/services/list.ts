import prisma from "@/lib/prisma";

export async function handleGetListDetail(board_id: number, email: string, list_id: number) {
    const profile = await prisma.profile.findUnique({
        where: {
            email
        }
    });
    if (!profile) {
        throw Error("user not found")
    };
    const board = await prisma.board.findUnique({
        where: {
            id: board_id,
            created_by: profile.id,
        }
    });
    if (!board) {
        throw Error("board not found")
    }
    const result = await prisma.list.findUnique({
        where: {
            id: list_id,
            board_id,
        }
    });

    return result
}
export async function handleCreateList(email: string, name: string, description: string, board_id: number) {
    const profile = await prisma.profile.findUnique({
        where: {
            email
        }
    })
    if (!profile) {
        throw Error("user not found")
    }
    const board = await prisma.board.findUnique({
        where: {
            id: board_id,
            created_by: profile.id
        }
    })
    if (!board) {
        throw Error("board not found")
    }
    const result = await prisma.list.create({
        data: {
            name,
            description,
            board_id
        }
    });

    return result;
}

export async function handleUpdateList(email: string, board_id: number, list_id: number, name: string, description: string) {
    const profile = await prisma.profile.findUnique({
        where: {
            email
        }
    })
    if (!profile) {
        throw Error("user not found")
    }
    const board = await prisma.board.findUnique({
        where: {
            id: board_id,
            created_by: profile.id
        }
    })
    if (!board) {
        throw Error('board not found')
    }
    const result = await prisma.list.update({
        where: {
            id: list_id,
            board_id
        },
        data: {
            name,
            description
        }
    });

    return result;
}

export async function handleArchieveList(email: string, board_id: number, list_id: number) {
    const profile = await prisma.profile.findUnique({
        where: {
            email
        }
    })
    if (!profile) {
        throw Error("user not found")
    }
    const board = await prisma.board.findUnique({
        where: {
            id: board_id,
            created_by: profile.id
        }
    })
    if (!board) {
        throw Error("board not found")
    }
    const data = await prisma.list.findUnique({
        where: {
            id: list_id,
            board_id: board.id
        }
    })

    if (!data?.is_archieved) {
        const result = await prisma.list.update({
            where: {
                id: list_id,
                board_id
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
                id: list_id,
                board_id
            },
            data: {
                is_archieved: false
            }
        });
        return result;
    }
}

export async function handleDeleteList(board_id: number, email: string, list_id: number) {
    const profile = await prisma.profile.findUnique({
        where: {
            email
        }
    })
    if (!profile) {
        throw Error("user not found")
    }
    const board = await prisma.board.findUnique({
        where: {
            id: board_id,
            created_by: profile.id
        }
    })
    if (!board) {
        throw Error("board not found")
    }
    await prisma.list.delete({
        where: {
            id: list_id,
            is_archieved: true,
            board_id: board.id
        }
    })
}