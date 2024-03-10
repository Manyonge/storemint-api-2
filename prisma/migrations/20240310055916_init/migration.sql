-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STORE_ADMIN');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('GOOGLE', 'EMAIL');

-- CreateTable
CREATE TABLE "User" (
    "uid" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "name" TEXT NOT NULL,
    "hash" TEXT,
    "role" "Role" NOT NULL,
    "provider" "Provider" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Retailer" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER NOT NULL,
    "businessName" TEXT,
    "businessEmail" TEXT NOT NULL,
    "businessLogo" TEXT,
    "passportPhoto" TEXT,
    "businessInstagram" TEXT,
    "nationalId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Retailer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ewallet" (
    "id" SERIAL NOT NULL,
    "retailerId" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ewallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreProduct" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "isHidden" BOOLEAN NOT NULL,
    "retailerId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoreProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "retailerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" SERIAL NOT NULL,
    "size" TEXT NOT NULL,
    "retailerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Condition" (
    "id" SERIAL NOT NULL,
    "condition" TEXT NOT NULL,
    "retailerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" SERIAL NOT NULL,
    "publicUrl" TEXT,
    "filepath" TEXT,
    "position" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instagramHandle" TEXT,
    "retailerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PickupmtaaniLocation" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PickupmtaaniLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PickupmtaaniAgent" (
    "id" SERIAL NOT NULL,
    "agent" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PickupmtaaniAgent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Retailer_uid_key" ON "Retailer"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Retailer_businessName_key" ON "Retailer"("businessName");

-- CreateIndex
CREATE UNIQUE INDEX "Retailer_businessEmail_key" ON "Retailer"("businessEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Ewallet_retailerId_key" ON "Ewallet"("retailerId");

-- CreateIndex
CREATE INDEX "StoreProduct_retailerId_idx" ON "StoreProduct"("retailerId");

-- CreateIndex
CREATE INDEX "StoreProduct_category_idx" ON "StoreProduct"("category");

-- CreateIndex
CREATE INDEX "StoreProduct_size_idx" ON "StoreProduct"("size");

-- CreateIndex
CREATE INDEX "StoreProduct_condition_idx" ON "StoreProduct"("condition");

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_key" ON "Category"("category");

-- CreateIndex
CREATE INDEX "Category_retailerId_idx" ON "Category"("retailerId");

-- CreateIndex
CREATE UNIQUE INDEX "Size_size_key" ON "Size"("size");

-- CreateIndex
CREATE INDEX "Size_retailerId_idx" ON "Size"("retailerId");

-- CreateIndex
CREATE UNIQUE INDEX "Condition_condition_key" ON "Condition"("condition");

-- CreateIndex
CREATE INDEX "Condition_retailerId_idx" ON "Condition"("retailerId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImage_publicUrl_key" ON "ProductImage"("publicUrl");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImage_filepath_key" ON "ProductImage"("filepath");

-- CreateIndex
CREATE INDEX "ProductImage_productId_idx" ON "ProductImage"("productId");

-- CreateIndex
CREATE INDEX "Customer_retailerId_idx" ON "Customer"("retailerId");

-- CreateIndex
CREATE UNIQUE INDEX "PickupmtaaniLocation_location_key" ON "PickupmtaaniLocation"("location");

-- CreateIndex
CREATE UNIQUE INDEX "PickupmtaaniAgent_agent_key" ON "PickupmtaaniAgent"("agent");

-- CreateIndex
CREATE INDEX "PickupmtaaniAgent_locationId_idx" ON "PickupmtaaniAgent"("locationId");
