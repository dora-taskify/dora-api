-- AlterTable
ALTER TABLE "public"."board" ADD COLUMN     "is_archieved" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."list" ADD COLUMN     "is_archieved" BOOLEAN NOT NULL DEFAULT false;
