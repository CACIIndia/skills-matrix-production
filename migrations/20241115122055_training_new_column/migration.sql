/*
  Warnings:

  - Added the required column `employeeId` to the `Training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeName` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Training" ADD COLUMN     "employeeId" TEXT NOT NULL,
ADD COLUMN     "employeeName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
