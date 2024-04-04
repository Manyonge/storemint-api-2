-- CreateEnum
CREATE TYPE "OrderState" AS ENUM ('PENDING_DISPATCH', 'DISPATCHED', 'FULFILLED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "state" "OrderState";
