import prisma from "@/lib/prisma";

export async function handleGetBoard(email: string) {
    const profile = await prisma.profile.findUnique({
        where: {
            email
        }
    })
    if (!profile) {
        throw Error("user not found")
    }
    const data = await prisma.board.findMany({
        where: {
            OR: [
                { created_by: profile.id },
                { board_member: { some: { profile_id: profile.id } } }
            ]
        },
    });

    return data;
};

export async function handleGetBoardDetail(board_id: number) {
    const data = await prisma.board.findUnique({
        where: {
            id: board_id
        },
        include: {
            list: true
        }
    });

    return data;
}

export async function handleCreateBoard(email: string, name: string) {
    const profile = await prisma.profile.findUnique({
        where: {
            email
        }
    })
    if (!profile) {
        throw Error("user not found")
    }
    const data = await prisma.$transaction(async (tx) => {
        const board = await tx.board.create({
            data: {
                name,
                created_by: profile.id
            }
        })
        await tx.list.create({
            data: {
                name: "To Do",
                description: "to do something",
                board_id: board.id,
            }
        })
        await tx.list.create({
            data: {
                name: "Doing",
                description: "doing something",
                board_id: board.id,
            }
        })
        await tx.list.create({
            data: {
                name: "Done",
                description: "something is done",
                board_id: board.id,
            }
        })

        return board
    })

    return data;
}

export async function handleUpdateBoard(board_id: number, name: string) {
    const data = await prisma.board.update({
        where: {
            id: board_id,
        },
        data: {
            name
        }
    })
    if (!data) {
        throw Error("board not found")
    }

    return data
}

export async function handleArchieveBoard(board_id: number) {
    const board = await prisma.board.findUnique({
        where: {
            id: board_id,
        }
    });

    if (!board) {
        throw Error("board not found")
    }

    if (!board?.is_archieved) {
        const data = await prisma.board.update({
            where: {
                id: board_id,
            },
            data: {
                is_archieved: true
            }
        })

        return data
    }
    if (board?.is_archieved) {
        const data = await prisma.board.update({
            where: {
                id: board_id,
            },
            data: {
                is_archieved: false
            }
        })

        return data
    }
}

export async function handleDeleteBoard(board_id: number) {
    const board = await prisma.board.findUnique({
        where: {
            id: board_id,
            is_archieved: true
        }
    });

    if (!board) {
        throw Error("board not found");
    }
    const data = await prisma.board.delete({
        where: { id: board.id }
    });

    if (!data) {
        throw Error("board is invalid")
    }

    return data
}

