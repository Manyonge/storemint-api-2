/*
  Warnings:

  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Condition" ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Ewallet" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "OrderStoreProduct" ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "ProductImage" ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Retailer" ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Size" ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Staff" ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "StoreProduct" ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;
