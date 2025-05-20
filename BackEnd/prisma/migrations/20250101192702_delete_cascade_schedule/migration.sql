-- DropForeignKey
ALTER TABLE "Schedule_Per_Day" DROP CONSTRAINT "Schedule_Per_Day_itinerary_destination_id_fkey";

-- AddForeignKey
ALTER TABLE "Schedule_Per_Day" ADD CONSTRAINT "Schedule_Per_Day_itinerary_destination_id_fkey" FOREIGN KEY ("itinerary_destination_id") REFERENCES "Itinerary_Destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
