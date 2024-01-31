import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const comments = await this.prisma.comments.findMany({
      where: {},
      select: {
        id: true,
        text: true,
        createdAt: true,
        likes: true,
        episodesId: true,
        responses: {
          select: {
            id: true,
            text: true,
            likes: true,
            createdAt: true,
            users: {
              select: {
                id: true,
                userName: true,
                profile: true,
                color: true,
                title: true,
              },
            },
          },
        },
        users: {
          select: {
            id: true,
            userName: true,
            profile: true,
            title: true,
            color: true,
          },
        },
      },
    });

    const formattedLikes = comments.map((comment) => ({
      ...comment,
      likes: comment.likes.length,
      responses: comment.responses.map((response) => ({
        ...response,
        likes: response.likes.length,
      })),
    }));

    return formattedLikes;
  }

  async findAllByEpisode(episodeId: number) {
    const comments = await this.prisma.comments.findMany({
      where: { episodes: { id: episodeId } },
      select: {
        id: true,
        text: true,
        createdAt: true,
        likes: true,
        episodesId: true,
        responses: {
          select: {
            id: true,
            text: true,
            likes: true,
            createdAt: true,
            users: {
              select: {
                id: true,
                userName: true,
                profile: true,
                color: true,
                title: true,
              },
            },
          },
        },
        users: {
          select: {
            id: true,
            userName: true,
            profile: true,
            title: true,
            color: true,
          },
        },
      },
    });

    const formattedLikes = comments.map((comment) => ({
      ...comment,
      likes: comment.likes.length,
      responses: comment.responses.map((response) => ({
        ...response,
        likes: response.likes.length,
      })),
    }));

    return formattedLikes;
  }

  async findByUser(userId: number) {
    const comments = await this.prisma.comments.findMany({
      where: { users: { id: userId } },
      select: {
        id: true,
        text: true,
        createdAt: true,
        likes: true,
        episodesId: true,
        responses: {
          select: {
            id: true,
            text: true,
            likes: true,
            createdAt: true,
            users: {
              select: {
                id: true,
                userName: true,
                profile: true,
                color: true,
                title: true,
              },
            },
          },
        },
        users: {
          select: {
            id: true,
            userName: true,
            profile: true,
            title: true,
            color: true,
          },
        },
      },
    });

    const formattedLikes = comments.map((comment) => ({
      ...comment,
      likes: comment.likes.length,
      responses: comment.responses.map((response) => ({
        ...response,
        likes: response.likes.length,
      })),
    }));

    return formattedLikes;
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
