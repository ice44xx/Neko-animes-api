-- CreateTable
CREATE TABLE "animes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "background" TEXT,
    "feature" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL,
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
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "classifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "animesId" INTEGER NOT NULL,
    "favorite" BOOLEAN DEFAULT false,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes-animes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "animesId" INTEGER NOT NULL,
    "like" BOOLEAN DEFAULT false,
    
    CONSTRAINT "likes-animes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnimesToCategories" (
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

-- AddForeignKey
ALTER TABLE "animes" ADD CONSTRAINT "animes_classificationsId_fkey" FOREIGN KEY ("classificationsId") REFERENCES "classifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_animesId_fkey" FOREIGN KEY ("animesId") REFERENCES "animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes-animes" ADD CONSTRAINT "likes-animes_animesId_fkey" FOREIGN KEY ("animesId") REFERENCES "animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes-animes" ADD CONSTRAINT "likes-animes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimesToCategories" ADD CONSTRAINT "_AnimesToCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "animes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimesToCategories" ADD CONSTRAINT "_AnimesToCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
