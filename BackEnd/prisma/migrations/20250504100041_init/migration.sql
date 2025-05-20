/*
  Warnings:

  - You are about to drop the column `location_id` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `itinerary_destination_id` on the `Schedule_Per_Day` table. All the data in the column will be lost.
  - You are about to drop the `Destination` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Itinerary_Destinations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[itinerary_id,date]` on the table `Schedule_Per_Day` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itinerary_id` to the `Accomodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_address` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_link` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itinerary_id` to the `Schedule_Per_Day` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_location_id_fkey";

-- DropForeignKey
ALTER TABLE "Itinerary_Destinations" DROP CONSTRAINT "Itinerary_Destinations_accomodation_id_fkey";

-- DropForeignKey
ALTER TABLE "Itinerary_Destinations" DROP CONSTRAINT "Itinerary_Destinations_destination_id_fkey";

-- DropForeignKey
ALTER TABLE "Itinerary_Destinations" DROP CONSTRAINT "Itinerary_Destinations_itinerary_id_fkey";

-- DropForeignKey
ALTER TABLE "Schedule_Per_Day" DROP CONSTRAINT "Schedule_Per_Day_itinerary_destination_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_itinerary_destination_id_fkey";

-- DropIndex
DROP INDEX "Schedule_Per_Day_itinerary_destination_id_date_key";

-- AlterTable
ALTER TABLE "Accomodation" ADD COLUMN     "itinerary_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "location_id",
ADD COLUMN     "location_address" TEXT NOT NULL,
ADD COLUMN     "location_link" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Itinerary" ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "finished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Schedule_Per_Day" DROP COLUMN "itinerary_destination_id",
ADD COLUMN     "itinerary_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Destination";

-- DropTable
DROP TABLE "Itinerary_Destinations";

-- DropTable
DROP TABLE "Location";

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "itinerary_id" INTEGER NOT NULL,
    "request" TEXT NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_Per_Day_itinerary_id_date_key" ON "Schedule_Per_Day"("itinerary_id", "date");

-- AddForeignKey
ALTER TABLE "Accomodation" ADD CONSTRAINT "Accomodation_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "Itinerary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule_Per_Day" ADD CONSTRAINT "Schedule_Per_Day_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "Itinerary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
