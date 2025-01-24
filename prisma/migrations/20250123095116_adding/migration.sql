/*
  Warnings:

  - Added the required column `skillId` to the `Certification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillName` to the `Certification` table without a default value. This is not possible if the table is not empty.
  - Made the column `categoryId` on table `Certification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryName` on table `Certification` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Certification" DROP CONSTRAINT "Certification_categoryId_fkey";

-- AlterTable
ALTER TABLE "Certification" ADD COLUMN     "skillId" TEXT NOT NULL,
ADD COLUMN     "skillName" TEXT NOT NULL,
ALTER COLUMN "categoryId" SET NOT NULL,
ALTER COLUMN "categoryName" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SkillCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
