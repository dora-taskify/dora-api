-- DropForeignKey
ALTER TABLE "public"."board" DROP CONSTRAINT "board_created_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."list" DROP CONSTRAINT "list_board_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."board" ADD CONSTRAINT "board_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."list" ADD CONSTRAINT "list_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "public"."board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
