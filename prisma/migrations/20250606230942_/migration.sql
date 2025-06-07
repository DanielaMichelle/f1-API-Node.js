/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Driver_slug_key" ON "Driver"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Team_slug_key" ON "Team"("slug");
