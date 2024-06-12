/*
  Warnings:

  - You are about to drop the column `nationalId` on the `Retailer` table. All the data in the column will be lost.
  - You are about to drop the column `passportPhoto` on the `Retailer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Retailer" DROP COLUMN "nationalId",
DROP COLUMN "passportPhoto",
ADD COLUMN     "isActivated" BOOLEAN;
