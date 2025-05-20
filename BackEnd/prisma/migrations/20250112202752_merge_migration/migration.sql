/*
  Warnings:

  - You are about to drop the column `description` on the `Accomodation` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Accomodation` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Accomodation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[place_id]` on the table `Accomodation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[place_id]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location_image` to the `Accomodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place_api` to the `Accomodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place_id` to the `Accomodation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accomodation" DROP COLUMN "description",
DROP COLUMN "rating",
DROP COLUMN "type",
ADD COLUMN     "categories" VARCHAR(2083)[],
ADD COLUMN     "location_image" VARCHAR(2083) NOT NULL,
ADD COLUMN     "opening_hours" VARCHAR(255),
ADD COLUMN     "people" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "phone" VARCHAR(50),
ADD COLUMN     "place_api" VARCHAR(255) NOT NULL,
ADD COLUMN     "place_id" VARCHAR(255) NOT NULL,
ADD COLUMN     "website" VARCHAR(2083),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(2083),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(2083),
ALTER COLUMN "cost" SET DEFAULT 0.0;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "categories" VARCHAR(2083)[],
ADD COLUMN     "opening_hours" VARCHAR(255),
ADD COLUMN     "phone" VARCHAR(50),
ADD COLUMN     "place_api" VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN     "place_id" VARCHAR(100) NOT NULL DEFAULT '',
ADD COLUMN     "website" VARCHAR(2083),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(2083),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(2083);

-- CreateIndex
CREATE UNIQUE INDEX "Accomodation_place_id_key" ON "Accomodation"("place_id");

-- CreateIndex
CREATE UNIQUE INDEX "Location_place_id_key" ON "Location"("place_id");
