-- Change the type of the certificationId column to UUID
ALTER TABLE "Training"
ADD COLUMN "certificationId" UUID;

ALTER TABLE "Training"
ALTER COLUMN "certificationId" TYPE UUID USING "certificationId"::UUID;

-- Add the foreign key constraint
ALTER TABLE "Training"
ADD CONSTRAINT "Training_certificationId_fkey"
FOREIGN KEY ("certificationId") REFERENCES "Certification"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
