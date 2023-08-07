/*
  Warnings:

  - The primary key for the `RecruiterProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RecruiterProfile` table. All the data in the column will be lost.
  - The primary key for the `WorkerProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `WorkerProfile` table. All the data in the column will be lost.
  - Added the required column `userId` to the `RecruiterProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `WorkerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RecruiterProfile" DROP CONSTRAINT "RecruiterProfile_id_fkey";

-- DropForeignKey
ALTER TABLE "WorkerProfile" DROP CONSTRAINT "WorkerProfile_id_fkey";

-- AlterTable
ALTER TABLE "RecruiterProfile" DROP CONSTRAINT "RecruiterProfile_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "RecruiterProfile_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "WorkerProfile" DROP CONSTRAINT "WorkerProfile_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "WorkerProfile_pkey" PRIMARY KEY ("userId");

-- AddForeignKey
ALTER TABLE "RecruiterProfile" ADD CONSTRAINT "RecruiterProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkerProfile" ADD CONSTRAINT "WorkerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
