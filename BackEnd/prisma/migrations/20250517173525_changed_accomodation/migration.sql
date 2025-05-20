/*
  Warnings:

  - You are about to drop the column `categories` on the `Accomodation` table. All the data in the column will be lost.
  - You are about to drop the column `location_image` on the `Accomodation` table. All the data in the column will be lost.
  - You are about to drop the column `opening_hours` on the `Accomodation` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Accomodation` table. All the data in the column will be lost.
  - You are about to drop the column `place_api` on the `Accomodation` table. All the data in the column will be lost.
  - You are about to drop the column `place_id` on the `Accomodation` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Accomodation` table. All the data in the column will be lost.
  - Added the required column `location_link` to the `Accomodation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Accomodation_place_id_key";

-- AlterTable
ALTER TABLE "Accomodation" DROP COLUMN "categories",
DROP COLUMN "location_image",
DROP COLUMN "opening_hours",
DROP COLUMN "phone",
DROP COLUMN "place_api",
DROP COLUMN "place_id",
DROP COLUMN "website",
ADD COLUMN     "location_link" VARCHAR(2083) NOT NULL;
