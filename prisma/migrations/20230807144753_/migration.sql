/*
  Warnings:

  - The primary key for the `RecruiterProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RecruiterProfile` table. All the data in the column will be lost.
  - The primary key for the `WorkerProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `WorkerProfile` table. All the data in the column will be lost.
  - You are about to drop the `Province` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserToRecruiterProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserToWorkerProfile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `RecruiterProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `WorkerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RecruiterProfile" DROP CONSTRAINT "RecruiterProfile_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "UserExperience" DROP CONSTRAINT "UserExperience_experienceId_fkey";

-- DropForeignKey
ALTER TABLE "UserToRecruiterProfile" DROP CONSTRAINT "UserToRecruiterProfile_recruiterProfileId_fkey";

-- DropForeignKey
ALTER TABLE "UserToRecruiterProfile" DROP CONSTRAINT "UserToRecruiterProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserToWorkerProfile" DROP CONSTRAINT "UserToWorkerProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserToWorkerProfile" DROP CONSTRAINT "UserToWorkerProfile_workerProfileId_fkey";

-- DropForeignKey
ALTER TABLE "WorkerProfile" DROP CONSTRAINT "WorkerProfile_provinceId_fkey";

-- AlterTable
ALTER TABLE "RecruiterProfile" DROP CONSTRAINT "RecruiterProfile_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "RecruiterProfile_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "domicile" TEXT;

-- AlterTable
ALTER TABLE "WorkerProfile" DROP CONSTRAINT "WorkerProfile_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "WorkerProfile_pkey" PRIMARY KEY ("userId");

-- DropTable
DROP TABLE "Province";

-- DropTable
DROP TABLE "UserToRecruiterProfile";

-- DropTable
DROP TABLE "UserToWorkerProfile";

-- AddForeignKey
ALTER TABLE "RecruiterProfile" ADD CONSTRAINT "RecruiterProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkerProfile" ADD CONSTRAINT "WorkerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExperience" ADD CONSTRAINT "UserExperience_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
