/*
  Warnings:

  - A unique constraint covering the columns `[slug,seasonId]` on the table `Race` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Race" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Race_slug_seasonId_key" ON "Race"("slug", "seasonId");
