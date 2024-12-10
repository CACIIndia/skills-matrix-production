-- AlterTable
ALTER TABLE "Certification" ADD COLUMN     "isTrainingLinked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "trainingRecordCategoryId" TEXT,
ADD COLUMN     "trainingRecordCategoryName" TEXT,
ADD COLUMN     "trainingRecordId" TEXT,
ADD COLUMN     "trainingRecordName" TEXT,
ADD COLUMN     "trainingRecordSkillId" TEXT;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_trainingRecordId_fkey" FOREIGN KEY ("trainingRecordId") REFERENCES "Training"("id") ON DELETE SET NULL ON UPDATE CASCADE;
