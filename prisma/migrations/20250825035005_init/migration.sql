-- DropForeignKey
ALTER TABLE "public"."board" DROP CONSTRAINT "board_created_by_fkey";

-- AddForeignKey
ALTER TABLE "public"."board" ADD CONSTRAINT "board_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
