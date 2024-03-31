-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "retailerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Staff_retailerId_idx" ON "Staff"("retailerId");
