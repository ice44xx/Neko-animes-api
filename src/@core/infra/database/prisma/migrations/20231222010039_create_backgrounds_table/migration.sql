/*
  Warnings:

  - You are about to drop the `LikesComments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LikesComments" DROP CONSTRAINT "LikesComments_commentsId_fkey";

-- DropForeignKey
ALTER TABLE "LikesComments" DROP CONSTRAINT "LikesComments_usersId_fkey";

-- DropTable
DROP TABLE "LikesComments";

-- CreateTable
CREATE TABLE "likes-comments" (
    "id" SERIAL NOT NULL,
    "commentsId" INTEGER NOT NULL,
    "usersId" INTEGER NOT NULL,

    CONSTRAINT "likes-comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "backgrounds" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "backgrounds_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likes-comments" ADD CONSTRAINT "likes-comments_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes-comments" ADD CONSTRAINT "likes-comments_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
