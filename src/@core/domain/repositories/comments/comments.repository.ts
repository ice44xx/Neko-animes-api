import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByEpisode(episodesId: number) {
    const comments = await this.prisma.comments.findMany({
      where: { episodesId },
      select: {
        id: true,
        text: true,
        createdAt: true,
        likes: true,
        users: {
          select: {
            id: true,
            userName: true,
            profile: true,
          },
        },
      },
    });

    const formattedLikes = comments.map((comment) => ({
      ...comment,
      likes: comment.likes.length,
    }));

    return formattedLikes;
  }

  async findByUser(usersId: number) {
    return this.prisma.comments.findMany({ where: { usersId } });
  }

  async findById(id: number) {
    return this.prisma.comments.findUnique({ where: { id } });
  }

  async create(data: Prisma.CommentsCreateInput) {
    return this.prisma.comments.create({ data });
  }

  async update(id: number, data: Prisma.CommentsUpdateInput) {
    return this.prisma.comments.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.comments.delete({ where: { id } });
  }
}
