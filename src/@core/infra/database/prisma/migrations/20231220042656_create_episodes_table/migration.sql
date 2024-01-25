-- CreateTable
CREATE TABLE "episodes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "episodeOrder" INTEGER NOT NULL,
    "seasonsId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);


-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_seasonsId_fkey" FOREIGN KEY ("seasonsId") REFERENCES "seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
