/*
  Warnings:

  - You are about to drop the `UserSkills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserSkills" DROP CONSTRAINT "UserSkills_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "skills" TEXT[];

-- DropTable
DROP TABLE "UserSkills";
