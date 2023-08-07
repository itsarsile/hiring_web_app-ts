-- DropForeignKey
ALTER TABLE "UserExperience" DROP CONSTRAINT "UserExperience_experienceId_fkey";

-- AddForeignKey
ALTER TABLE "UserExperience" ADD CONSTRAINT "UserExperience_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;
