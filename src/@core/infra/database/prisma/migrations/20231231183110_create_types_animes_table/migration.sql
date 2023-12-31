/*
  Warnings:

  - Added the required column `typesId` to the `animes` table without a default value. This is not possible if the table is not empty.
  - Made the column `favorite` on table `favorites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `like` on table `likes-animes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `like` on table `likes-episodes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "animes" ADD COLUMN     "typesId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "favorites" ALTER COLUMN "favorite" SET NOT NULL;

-- AlterTable
ALTER TABLE "likes-animes" ALTER COLUMN "like" SET NOT NULL;

-- AlterTable
ALTER TABLE "likes-comments" ADD COLUMN     "like" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "likes-episodes" ALTER COLUMN "like" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "birthday" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "types-animes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "types-animes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "types-animes_name_key" ON "types-animes"("name");

-- AddForeignKey
ALTER TABLE "animes" ADD CONSTRAINT "animes_typesId_fkey" FOREIGN KEY ("typesId") REFERENCES "types-animes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "users_username_key" RENAME TO "users_userName_key";
