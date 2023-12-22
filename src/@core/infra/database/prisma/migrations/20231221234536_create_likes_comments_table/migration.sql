-- CreateTable
CREATE TABLE "LikesComments" (
    "id" SERIAL NOT NULL,
    "commentsId" INTEGER NOT NULL,
    "usersId" INTEGER NOT NULL,

    CONSTRAINT "LikesComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LikesComments" ADD CONSTRAINT "LikesComments_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikesComments" ADD CONSTRAINT "LikesComments_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
