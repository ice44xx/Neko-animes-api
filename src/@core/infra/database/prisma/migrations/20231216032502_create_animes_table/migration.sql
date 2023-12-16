-- CreateTable
CREATE TABLE "Animes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "feature" BOOLEAN NOT NULL,
    "classificationsId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Animes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classifications" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Classifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorites" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikesAnimes" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "LikesAnimes_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "Animes" ADD CONSTRAINT "Animes_classificationsId_fkey" FOREIGN KEY ("classificationsId") REFERENCES "Classifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimesToCategories" ADD CONSTRAINT "_AnimesToCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimesToCategories" ADD CONSTRAINT "_AnimesToCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimesToLikesAnimes" ADD CONSTRAINT "_AnimesToLikesAnimes_A_fkey" FOREIGN KEY ("A") REFERENCES "Animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimesToLikesAnimes" ADD CONSTRAINT "_AnimesToLikesAnimes_B_fkey" FOREIGN KEY ("B") REFERENCES "LikesAnimes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimesToFavorites" ADD CONSTRAINT "_AnimesToFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimesToFavorites" ADD CONSTRAINT "_AnimesToFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
