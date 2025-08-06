/*
  Warnings:

  - You are about to drop the column `createdAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `collectible` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `collectible` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."collectible" DROP CONSTRAINT "collectible_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."categories" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."collectible" DROP COLUMN "categoryId",
ADD COLUMN     "category_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."collectible" ADD CONSTRAINT "collectible_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
