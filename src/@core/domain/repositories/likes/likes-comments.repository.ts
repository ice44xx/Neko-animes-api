import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LikesCommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllLikesUser(usersId: number) {
    const likes = await this.prisma.likesComments.findMany({
      where: { usersId },
      select: {
        comments: true,
        like: true,
      },
    });

    return likes.map((like) => ({
      commentId: like.comments.id,
      like: like.like,
    }));
  }

  async findOne(userId: number, commentId: number) {
    return this.prisma.likesComments.findFirst({
      where: {
        usersId: userId,
        commentsId: commentId,
      },
    });
  }

  async create(data: Prisma.LikesCommentsCreateInput) {
    return this.prisma.likesComments.create({ data });
  }

  async remove(usersId: number, commentId: number) {
    return this.prisma.likesComments.deleteMany({ where: { usersId, commentsId: commentId } });
  }
}
