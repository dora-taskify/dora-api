/*
  Warnings:

  - Added the required column `position` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."task" ADD COLUMN     "position" INTEGER NOT NULL;
