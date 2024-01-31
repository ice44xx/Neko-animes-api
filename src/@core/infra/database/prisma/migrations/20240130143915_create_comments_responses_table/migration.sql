-- CreateTable
CREATE TABLE "comment_responses" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "usersId" INTEGER NOT NULL,
    "commentsId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_responses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comment_responses" ADD CONSTRAINT "comment_responses_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_responses" ADD CONSTRAINT "comment_responses_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
