/*
  Warnings:

  - You are about to drop the column `businessName` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `businessName` on the `Condition` table. All the data in the column will be lost.
  - You are about to drop the column `businessName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `businessName` on the `Size` table. All the data in the column will be lost.
  - You are about to drop the column `businessName` on the `StoreProduct` table. All the data in the column will be lost.
  - Added the required column `retailerId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retailerId` to the `Condition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retailerId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retailerId` to the `Size` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retailerId` to the `StoreProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Category_businessName_idx` ON `Category`;

-- DropIndex
DROP INDEX `Condition_businessName_idx` ON `Condition`;

-- DropIndex
DROP INDEX `Customer_businessName_idx` ON `Customer`;

-- DropIndex
DROP INDEX `Size_businessName_idx` ON `Size`;

-- DropIndex
DROP INDEX `StoreProduct_businessName_idx` ON `StoreProduct`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `businessName`,
    ADD COLUMN `retailerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Condition` DROP COLUMN `businessName`,
    ADD COLUMN `retailerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `businessName`,
    ADD COLUMN `retailerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Size` DROP COLUMN `businessName`,
    ADD COLUMN `retailerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `StoreProduct` DROP COLUMN `businessName`,
    ADD COLUMN `retailerId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `Category_retailerId_idx` ON `Category`(`retailerId`);

-- CreateIndex
CREATE INDEX `Condition_retailerId_idx` ON `Condition`(`retailerId`);

-- CreateIndex
CREATE INDEX `Customer_retailerId_idx` ON `Customer`(`retailerId`);

-- CreateIndex
CREATE INDEX `Size_retailerId_idx` ON `Size`(`retailerId`);

-- CreateIndex
CREATE INDEX `StoreProduct_retailerId_idx` ON `StoreProduct`(`retailerId`);
