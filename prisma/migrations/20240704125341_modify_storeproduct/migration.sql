-- AlterTable
ALTER TABLE "StoreProduct" ADD COLUMN     "conditionRating" INTEGER,
ADD COLUMN     "salePrice" INTEGER,
ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "condition" DROP NOT NULL;
