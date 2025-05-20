/*
  Warnings:

  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_user_id_fkey";

-- DropTable
DROP TABLE "Todo";

-- CreateTable
CREATE TABLE "Budget" (
    "id" SERIAL NOT NULL,
    "itinerary_id" INTEGER NOT NULL,
    "estimated_budget" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "actual_budget" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "type" VARCHAR(20) NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itinerary_Users" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "itinerary_id" INTEGER NOT NULL,
    "role" VARCHAR(20) NOT NULL,

    CONSTRAINT "Itinerary_Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itinerary" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL,
    "updated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itinerary_Destinations" (
    "id" SERIAL NOT NULL,
    "itinerary_id" INTEGER NOT NULL,
    "destination_id" INTEGER NOT NULL,
    "accomodation_id" INTEGER,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Itinerary_Destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accomodation" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL,
    "rating" SMALLINT NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,
    "type" VARCHAR(30) NOT NULL,

    CONSTRAINT "Accomodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "province" VARCHAR(100) NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule_Per_Day" (
    "id" SERIAL NOT NULL,
    "itinerary_destination_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_Per_Day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,
    "day_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL,
    "location_image" VARCHAR(2083) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "itinerary_destination_id" INTEGER NOT NULL,
    "ticket_image" VARCHAR(2083) NOT NULL,
    "type" VARCHAR(20) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Itinerary_Users_user_id_itinerary_id_key" ON "Itinerary_Users"("user_id", "itinerary_id");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_Per_Day_date_key" ON "Schedule_Per_Day"("date");

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary_Users" ADD CONSTRAINT "Itinerary_Users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary_Users" ADD CONSTRAINT "Itinerary_Users_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "Itinerary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary_Destinations" ADD CONSTRAINT "Itinerary_Destinations_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary_Destinations" ADD CONSTRAINT "Itinerary_Destinations_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "Itinerary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary_Destinations" ADD CONSTRAINT "Itinerary_Destinations_accomodation_id_fkey" FOREIGN KEY ("accomodation_id") REFERENCES "Accomodation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule_Per_Day" ADD CONSTRAINT "Schedule_Per_Day_itinerary_destination_id_fkey" FOREIGN KEY ("itinerary_destination_id") REFERENCES "Itinerary_Destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "Schedule_Per_Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_itinerary_destination_id_fkey" FOREIGN KEY ("itinerary_destination_id") REFERENCES "Itinerary_Destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
