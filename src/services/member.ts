import prisma from "@/lib/prisma";

export async function handleInviteMemberBoard(board_id: number, profile_id: number) {
    const member = await prisma.board_member.findFirst({
        where: {
            profile_id
        }
    })
    if (member) {
        throw Error("this user already member in this board")
    }
    const data = await prisma.board_member.create({
        data: {
            board_id,
            profile_id
        }
    })

    return data
}

export async function handleMemberBoard(board_id: number) {
    const data = await prisma.board_member.findMany({
        where: {
            board_id
        }
    })

    return data
}

export async function handleDeleteMemberBoard(id: number) {
    const data = await prisma.board_member.delete({
        where: {
            id
        }
    })

    return data
}
