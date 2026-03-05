/*
  Warnings:

  - Added the required column `format` to the `Animation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animation" ADD COLUMN     "format" TEXT NOT NULL,
ALTER COLUMN "runtime" DROP NOT NULL;
