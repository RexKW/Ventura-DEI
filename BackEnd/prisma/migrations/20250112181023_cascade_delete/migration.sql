-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_day_id_fkey";

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "Schedule_Per_Day"("id") ON DELETE CASCADE ON UPDATE CASCADE;
