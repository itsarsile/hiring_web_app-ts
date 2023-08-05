/*
  Warnings:

  - You are about to drop the column `skills` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "skills";

-- CreateTable
CREATE TABLE "UserSkills" (
    "id" SERIAL NOT NULL,
    "skillName" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "UserSkills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserSkills" ADD CONSTRAINT "UserSkills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
