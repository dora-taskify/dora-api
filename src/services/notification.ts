import prisma from '@/lib/prisma';

export async function handleGetNotification(profile_id: number) {
    const data = await prisma.notification.findMany({
        where: { profile_id },
        orderBy: { created_at: "desc" },
    });
    return data;
}

export async function handleReadNotification(id: number, profile_id: number) {
    const notification = await prisma.notification.findUnique({
        where: { id: Number(id) },
    });

    if (!notification || notification.profile_id !== profile_id) {
        throw { code: 403, message: "You are not allowed to update this notification" };
    }

    await prisma.notification.update({
        where: { id: Number(id) },
        data: { read: true },
    });
}