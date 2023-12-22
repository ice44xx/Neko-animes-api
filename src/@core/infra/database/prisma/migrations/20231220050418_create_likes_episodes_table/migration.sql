-- CreateTable
CREATE TABLE "likes-episodes" (
    "id" SERIAL NOT NULL,
    "usersId" INTEGER NOT NULL,
    "episodesId" INTEGER NOT NULL,

    CONSTRAINT "likes-episodes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likes-episodes" ADD CONSTRAINT "likes-episodes_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes-episodes" ADD CONSTRAINT "likes-episodes_episodesId_fkey" FOREIGN KEY ("episodesId") REFERENCES "episodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
