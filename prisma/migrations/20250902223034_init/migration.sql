-- DropForeignKey
ALTER TABLE "public"."item" DROP CONSTRAINT "item_task_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."task" DROP CONSTRAINT "task_list_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."task" ADD CONSTRAINT "task_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "public"."list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."item" ADD CONSTRAINT "item_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "public"."task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
