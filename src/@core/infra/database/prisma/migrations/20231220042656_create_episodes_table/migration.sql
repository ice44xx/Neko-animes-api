-- CreateTable
CREATE TABLE "episodes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "episodeOrder" INTEGER NOT NULL,
    "seasonsId" INTEGER NOT NULL,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "episodes_episodeOrder_key" ON "episodes"("episodeOrder");

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_seasonsId_fkey" FOREIGN KEY ("seasonsId") REFERENCES "seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
