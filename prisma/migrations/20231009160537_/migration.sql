/*
  Warnings:

  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Province` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "RecruiterProfile" DROP CONSTRAINT "RecruiterProfile_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "WorkerProfile" DROP CONSTRAINT "WorkerProfile_provinceId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "domicile" TEXT;

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "Province";
