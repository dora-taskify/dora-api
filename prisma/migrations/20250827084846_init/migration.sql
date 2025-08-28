-- CreateTable
CREATE TABLE "public"."task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_done" BOOLEAN NOT NULL,
    "priority" "public"."label" NOT NULL DEFAULT 'MEDIUM',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deadline" TIMESTAMP(3),
    "list_id" INTEGER NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."task" ADD CONSTRAINT "task_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "public"."list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
