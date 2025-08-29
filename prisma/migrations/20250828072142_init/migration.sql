-- CreateTable
CREATE TABLE "public"."item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_done" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "task_id" INTEGER NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."item" ADD CONSTRAINT "item_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "public"."task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
