-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "method" TEXT;

-- CreateTable
CREATE TABLE "Transportation" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Transportation_pkey" PRIMARY KEY ("id")
);
