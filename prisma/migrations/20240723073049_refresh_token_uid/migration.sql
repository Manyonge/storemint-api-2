/*
  Warnings:

  - Added the required column `uid` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "uid" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "RefreshToken_uid_idx" ON "RefreshToken"("uid");
