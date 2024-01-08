/*
  Warnings:

  - Added the required column `dubbedsId` to the `animes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "animes" ADD COLUMN     "dubbedsId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "dubbeds" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "dubbeds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dubbeds_name_key" ON "dubbeds"("name");

-- AddForeignKey
ALTER TABLE "animes" ADD CONSTRAINT "animes_dubbedsId_fkey" FOREIGN KEY ("dubbedsId") REFERENCES "dubbeds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
