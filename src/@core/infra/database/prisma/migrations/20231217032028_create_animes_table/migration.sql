-- CreateTable
CREATE TABLE "animes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "feature" BOOLEAN NOT NULL DEFAULT false,
    "classificationsId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "animes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classifications" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "classifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes-animes" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "likes-animes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnimesToCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimesToLikesAnimes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimesToFavorites" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "classifications_name_key" ON "classifications"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimesToCategories_AB_unique" ON "_AnimesToCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimesToCategories_B_index" ON "_AnimesToCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimesToLikesAnimes_AB_unique" ON "_AnimesToLikesAnimes"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimesToLikesAnimes_B_index" ON "_AnimesToLikesAnimes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimesToFavorites_AB_unique" ON "_AnimesToFavorites"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimesToFavorites_B_index" ON "_AnimesToFavorites"("B");

-- AddForeignKey
ALTER TABLE "animes" ADD CONSTRAINT "animes_classificationsId_fkey" FOREIGN KEY ("classificationsId") REFERENCES "classifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimesToCategories" ADD CONSTRAINT "_AnimesToCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimesToCategories" ADD CONSTRAINT "_AnimesToCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimesToLikesAnimes" ADD CONSTRAINT "_AnimesToLikesAnimes_A_fkey" FOREIGN KEY ("A") REFERENCES "animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimesToLikesAnimes" ADD CONSTRAINT "_AnimesToLikesAnimes_B_fkey" FOREIGN KEY ("B") REFERENCES "likes-animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimesToFavorites" ADD CONSTRAINT "_AnimesToFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimesToFavorites" ADD CONSTRAINT "_AnimesToFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
