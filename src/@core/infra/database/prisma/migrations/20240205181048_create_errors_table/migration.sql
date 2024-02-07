-- CreateTable
CREATE TABLE "errors" (
    "id" SERIAL NOT NULL,
    "anime" TEXT NOT NULL,
    "episodeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "errors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "errors_episodeId_key" ON "errors"("episodeId");
