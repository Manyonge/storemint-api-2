/*
  Warnings:

  - You are about to drop the column `url` on the `ProductImage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[publicUrl]` on the table `ProductImage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[filepath]` on the table `ProductImage` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `ProductImage_url_key` ON `ProductImage`;

-- AlterTable
ALTER TABLE `ProductImage` DROP COLUMN `url`,
    ADD COLUMN `filepath` VARCHAR(191) NULL,
    ADD COLUMN `publicUrl` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ProductImage_publicUrl_key` ON `ProductImage`(`publicUrl`);

-- CreateIndex
CREATE UNIQUE INDEX `ProductImage_filepath_key` ON `ProductImage`(`filepath`);
