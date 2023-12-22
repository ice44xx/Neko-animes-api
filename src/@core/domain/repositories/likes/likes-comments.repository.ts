import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LikesCommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

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

  async remove(id: number) {
    return this.prisma.likesComments.delete({ where: { id } });
  }
}
