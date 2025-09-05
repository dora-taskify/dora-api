import cron from "node-cron";
import { addDays, startOfDay, endOfDay } from "date-fns";
import prisma from "@/lib/prisma";

cron.schedule("0 0 * * *", async () => {
    const targetDay = addDays(new Date(), 2);

    const tasks = await prisma.task.findMany({
        where: {
            is_done: false,
            deadline: {
                gte: startOfDay(targetDay),
                lte: endOfDay(targetDay),
            },
        },
        include: {
            list: {
                include: {
                    board: {
                        include: {
                            profile: true,
                            board_member: { include: { profile: true } },
                        },
                    },
                },
            },
        },
    });

    for (const task of tasks) {
        const board = task.list.board;

        const recipients = new Map<number, typeof board.profile>();
        recipients.set(board.profile.id, board.profile);
        for (const bm of board.board_member) {
            recipients.set(bm.profile.id, bm.profile);
        }

        for (const user of recipients.values()) {
            try {
                await prisma.notification.create({
                    data: {
                        message: `Task "${task.name}" akan jatuh tempo dalam 2 hari.`,
                        task_id: task.id,
                        profile_id: user.id,
                    },
                });
            } catch (err) {
                console.error("Gagal buat notifikasi:", err);
            }
        }
    }
});
