/*
  Warnings:

  - The primary key for the `RecruiterProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `RecruiterProfile` table. All the data in the column will be lost.
  - The primary key for the `WorkerProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `WorkerProfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecruiterProfile" DROP CONSTRAINT "RecruiterProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkerProfile" DROP CONSTRAINT "WorkerProfile_userId_fkey";

-- AlterTable
ALTER TABLE "RecruiterProfile" DROP CONSTRAINT "RecruiterProfile_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "RecruiterProfile_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "WorkerProfile" DROP CONSTRAINT "WorkerProfile_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "WorkerProfile_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "RecruiterProfile" ADD CONSTRAINT "RecruiterProfile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkerProfile" ADD CONSTRAINT "WorkerProfile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
