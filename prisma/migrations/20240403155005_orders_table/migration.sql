-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('AGENT_FULLY_PAID', 'AGENT_PAY_ON_DELIVERY', 'DOORSTEP_FULLY_PAID', 'DOORSTEP_PAY_ON_DELIVERY', 'ERRAND');

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL,
    "retailerId" INTEGER NOT NULL,
    "type" "OrderType" NOT NULL,
    "deliveryFee" INTEGER NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "receiverLocation" TEXT NOT NULL,
    "receiverAgent" TEXT NOT NULL,
    "doorstepAddress" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "errandLocation" TEXT NOT NULL,
    "errandSacco" TEXT NOT NULL,
    "specialInstructions" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
