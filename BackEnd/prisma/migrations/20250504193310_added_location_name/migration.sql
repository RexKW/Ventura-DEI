/*
  Warnings:

  - Added the required column `location_name` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "location_name" TEXT NOT NULL,
ADD COLUMN     "location_name2" TEXT;
