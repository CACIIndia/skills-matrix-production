-- AlterTable
ALTER TABLE "Certification" ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "categoryName" TEXT;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SkillCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
