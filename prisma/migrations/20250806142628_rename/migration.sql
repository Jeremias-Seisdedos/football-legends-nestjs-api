/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Collectible` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Collectible" DROP CONSTRAINT "Collectible_categoryId_fkey";

-- DropTable
DROP TABLE "public"."Category";

-- DropTable
DROP TABLE "public"."Collectible";

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."collectible" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "collectible_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."collectible" ADD CONSTRAINT "collectible_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
