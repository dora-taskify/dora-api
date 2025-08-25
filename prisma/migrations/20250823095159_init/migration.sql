-- CreateEnum
CREATE TYPE "public"."label" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- AlterTable
ALTER TABLE "public"."profile" ALTER COLUMN "updated_at" DROP DEFAULT;

-- CreateTable
CREATE TABLE "public"."board" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."list" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "board_id" INTEGER NOT NULL,

    CONSTRAINT "list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "board_name_key" ON "public"."board"("name");

-- CreateIndex
CREATE UNIQUE INDEX "list_name_key" ON "public"."list"("name");

-- AddForeignKey
ALTER TABLE "public"."board" ADD CONSTRAINT "board_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."profile"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."list" ADD CONSTRAINT "list_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "public"."board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
