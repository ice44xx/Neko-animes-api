import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LikesResponsesCommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllLikesUser(usersId: number) {
    const likes = await this.prisma.likesResponsesComments.findMany({
      where: { usersId },
      select: {
        commentResponses: true,
        like: true,
      },
    });

    return likes.map((like) => ({
      commentId: like.commentResponses.id,
      like: like.like,
    }));
  }

  async findOne(userId: number, commentId: number) {
    return this.prisma.likesResponsesComments.findFirst({
      where: {
        usersId: userId,
        commentResponsesId: commentId,
      },
    });
  }

  async create(data: Prisma.LikesResponsesCommentsCreateInput) {
    return this.prisma.likesResponsesComments.create({ data });
  }

  async remove(usersId: number, commentId: number) {
    return this.prisma.likesResponsesComments.deleteMany({ where: { usersId, commentResponsesId: commentId } });
  }
}
