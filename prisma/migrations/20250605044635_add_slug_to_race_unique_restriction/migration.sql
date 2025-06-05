/*
  Warnings:

  - A unique constraint covering the columns `[slug,seasonId]` on the table `Race` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `Race` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Race" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Race_slug_seasonId_key" ON "Race"("slug", "seasonId");
