-- AlterTable
ALTER TABLE "StoreProduct" ADD COLUMN     "orderId" INTEGER;

-- CreateTable
CREATE TABLE "OrderStoreProduct" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "retailerId" INTEGER NOT NULL,

    CONSTRAINT "OrderStoreProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrderStoreProduct_retailerId_idx" ON "OrderStoreProduct"("retailerId");

-- CreateIndex
CREATE INDEX "OrderStoreProduct_productId_idx" ON "OrderStoreProduct"("productId");

-- CreateIndex
CREATE INDEX "OrderStoreProduct_orderId_idx" ON "OrderStoreProduct"("orderId");

-- CreateIndex
CREATE INDEX "Order_retailerId_idx" ON "Order"("retailerId");
