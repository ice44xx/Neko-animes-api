-- CreateTable
CREATE TABLE "likes-comments-responses" (
    "id" SERIAL NOT NULL,
    "commentResponsesId" INTEGER NOT NULL,
    "usersId" INTEGER NOT NULL,
    "like" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "likes-comments-responses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likes-comments-responses" ADD CONSTRAINT "likes-comments-responses_commentResponsesId_fkey" FOREIGN KEY ("commentResponsesId") REFERENCES "comment_responses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes-comments-responses" ADD CONSTRAINT "likes-comments-responses_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
