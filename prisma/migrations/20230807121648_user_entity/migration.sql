/*
  Warnings:

  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cityName` to the `Province` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_provinceId_fkey";

-- AlterTable
ALTER TABLE "Province" ADD COLUMN     "cityName" TEXT NOT NULL;

-- DropTable
DROP TABLE "City";
