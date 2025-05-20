/*
  Warnings:

  - A unique constraint covering the columns `[itinerary_destination_id,date]` on the table `Schedule_Per_Day` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Schedule_Per_Day_itinerary_destination_id_date_key" ON "Schedule_Per_Day"("itinerary_destination_id", "date");
