/*
  Warnings:

  - A unique constraint covering the columns `[destination_api_id]` on the table `Destination` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `destination_api_id` to the `Destination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Destination" ADD COLUMN     "destination_api_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Destination_destination_api_id_key" ON "Destination"("destination_api_id");
