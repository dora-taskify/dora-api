/*
  Warnings:

  - Changed the type of `created_by` on the `board` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."board" DROP CONSTRAINT "board_created_by_fkey";

-- AlterTable
ALTER TABLE "public"."board" DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."board" ADD CONSTRAINT "board_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
