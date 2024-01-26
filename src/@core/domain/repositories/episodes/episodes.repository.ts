import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EpisodesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const episodes = await this.prisma.episodes.findMany({
      where: {},
      select: {
        id: true,
        name: true,
        url: true,
        thumbnailUrl: true,
        episodeOrder: true,
        likes: true,
        seasons: {
          select: {
            id: true,
            name: true,
            anime: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        comments: {
          select: {
            id: true,
            episodes: {
              select: {
                id: true,
                name: true,
              },
            },
            usersId: true,
            text: true,
            likes: true,
            createdAt: true,
          },
        },
      },
    });

    const formattedLikes = episodes.map((episode) => ({
      ...episode,
      likes: episode.likes.length,
      comments: episode.comments.map((comment) => ({
        ...episode,
        likes: comment.likes.length,
      })),
    }));

    return formattedLikes;
  }

  async findTop10Newest() {
    return await this.prisma.episodes.findMany({
      where: {},
      select: {
        id: true,
        name: true,
        url: true,
        thumbnailUrl: true,
        episodeOrder: true,
        createdAt: true,
        updatedAt: true,
        seasons: {
          select: {
            animeId: true,
            anime: true,
          },
        },
      },
      take: 12,
      orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async findByAnimeName(name: string) {
    const episodes = await this.prisma.episodes.findMany({
      where: {
        seasons: {
          anime: {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        url: true,
        thumbnailUrl: true,
        episodeOrder: true,
        likes: true,
        seasons: {
          select: {
            id: true,
            name: true,
            anime: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        comments: {
          select: {
            id: true,
            episodes: {
              select: {
                id: true,
                name: true,
              },
            },
            usersId: true,
            text: true,
            likes: true,
            createdAt: true,
          },
        },
      },
    });

    const formattedLikes = episodes.map((episode) => ({
      ...episode,
      likes: episode.likes.length,
      comments: episode.comments.map((comment) => ({
        ...episode,
        likes: comment.likes.length,
      })),
    }));

    return formattedLikes;
  }

  async findByAnimeId(id: number) {
    const episodes = await this.prisma.episodes.findMany({
      where: {
        seasons: {
          anime: {
            id: id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        url: true,
        thumbnailUrl: true,
        episodeOrder: true,
        likes: true,
        seasons: {
          select: {
            id: true,
            name: true,
            anime: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        comments: {
          select: {
            id: true,
            episodes: {
              select: {
                id: true,
                name: true,
              },
            },
            usersId: true,
            text: true,
            likes: true,
            createdAt: true,
          },
        },
      },
    });

    const formattedLikes = episodes.map((episode) => ({
      ...episode,
      likes: episode.likes.length,
      comments: episode.comments.map((comment) => ({
        ...episode,
        likes: comment.likes.length,
      })),
    }));

    return formattedLikes;
  }

  async findById(id: number) {
    return this.prisma.episodes.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        url: true,
        thumbnailUrl: true,
        episodeOrder: true,
        seasons: {
          select: {
            id: true,
            name: true,
            anime: {
              select: {
                id: true,
                name: true,
                types: true,
                thumbnailUrl: true,
              },
            },
          },
        },
        comments: {
          select: {
            id: true,
            episodes: {
              select: {
                id: true,
                name: true,
              },
            },
            usersId: true,
            text: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.EpisodesCreateInput) {
    return this.prisma.episodes.create({ data });
  }

  async update(id: number, data: Prisma.EpisodesUpdateInput) {
    return this.prisma.episodes.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.episodes.delete({ where: { id } });
  }
}
