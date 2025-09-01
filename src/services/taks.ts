import prisma from "@/lib/prisma";

export function handleGetTask(list_id: number) {
    const data = prisma.task.findMany({
        where: {
            list_id
        }
    })

    return data
}

export const updateTaskPosition = async ( taskId: number, newListId: number, newPosition: number ) => {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) throw new Error("Task not found");

    // kalau pindah antar list
    if (task.list_id !== newListId) {
      // geser posisi task di list tujuan
      await prisma.task.updateMany({
        where: {
          list_id: newListId,
          position: { gte: newPosition },
        },
        data: {
          position: { increment: 1 },
        },
      });

      return prisma.task.update({
        where: { id: taskId },
        data: {
          list_id: newListId,
          position: newPosition,
        },
      });
    }

    // kalau cuma reorder di list yang sama
    if (task.position < newPosition) {
      await prisma.task.updateMany({
        where: {
          list_id: task.list_id,
          position: {
            gt: task.position,
            lte: newPosition,
          },
        },
        data: { position: { decrement: 1 } },
      });
    } else {
      await prisma.task.updateMany({
        where: {
          list_id: task.list_id,
          position: {
            gte: newPosition,
            lt: task.position,
          },
        },
        data: { position: { increment: 1 } },
      });
    }

    return prisma.task.update({
      where: { id: taskId },
      data: { position: newPosition },
    });
};

export function handleGetTaskDetail(list_id: number, taks_id: number) {
    const data = prisma.task.findUnique({
        where: {
            id: taks_id,
            list_id
        }
    })

    return data
}

export async function handleCreateTask(list_id: number, name: string, description: string, position: number, deadline: string) {

    const maxTask = await prisma.task.findFirst({
      where: { list_id },
      orderBy: { position: "desc" }
    })

    const newPosition = maxTask ? maxTask.position + 1 : 1

    const data = prisma.task.create({
        data: {
            list_id,
            name,
            description,
            position: newPosition,
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

export async function handleDeleteTask(list_id: number, task_id: number) {

    const data = prisma.task.delete({
        where: {
            id: task_id,
            list_id
        }
    })

    const tasks = await prisma.task.findMany({
      where: { list_id },
      orderBy: { position: "asc" }
    })

    for (let i = 0; i < tasks.length; i++) {
      await prisma.task.update({
        where: { id: tasks[i].id },
        data: { position: i + 1 }
      })
    }
    return data
}