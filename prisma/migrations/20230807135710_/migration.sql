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

-- CreateTable
CREATE TABLE "UserToWorkerProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "workerProfileId" INTEGER NOT NULL,

    CONSTRAINT "UserToWorkerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToRecruiterProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "recruiterProfileId" INTEGER NOT NULL,

    CONSTRAINT "UserToRecruiterProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserToWorkerProfile_userId_key" ON "UserToWorkerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserToRecruiterProfile_userId_key" ON "UserToRecruiterProfile"("userId");

-- AddForeignKey
ALTER TABLE "UserToWorkerProfile" ADD CONSTRAINT "UserToWorkerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToWorkerProfile" ADD CONSTRAINT "UserToWorkerProfile_workerProfileId_fkey" FOREIGN KEY ("workerProfileId") REFERENCES "WorkerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToRecruiterProfile" ADD CONSTRAINT "UserToRecruiterProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToRecruiterProfile" ADD CONSTRAINT "UserToRecruiterProfile_recruiterProfileId_fkey" FOREIGN KEY ("recruiterProfileId") REFERENCES "RecruiterProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
