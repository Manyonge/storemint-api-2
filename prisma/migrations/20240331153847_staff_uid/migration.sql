/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "uid" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Staff_uid_key" ON "Staff"("uid");
