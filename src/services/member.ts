import prisma from "@/lib/prisma";

export async function handleInviteMemberBoard(board_id: number, profile_email: string) {
    const profile = await prisma.profile.findUnique({
        where: {
            email: profile_email
        }
    })

    if (!profile) {
        throw Error("user not found")
    }

    const member = await prisma.board_member.findFirst({
        where: {
            AND: [
                { profile_id: profile.id },
                { board_id }
            ]
        }
    })

    if (member) {
        throw Error("this user already member in this board")
    }

    const data = await prisma.board_member.create({
        data: {
            board_id,
            profile_id: profile.id
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

export async function handleDeleteMemberBoard(member_id: number) {
    const data = await prisma.board_member.delete({
        where: {
            id: member_id
        }
    })

    return data
}
