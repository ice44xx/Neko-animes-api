import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AnimesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const animes = await this.prisma.animes.findMany({
      select: {
        id: true,
        name: true,
        synopsis: true,
        thumbnailUrl: true,
        feature: true,
        classifications: {
          select: {
            name: true,
          },
        },
        categories: {
          select: {
            name: true,
          },
        },
        likes: true,
        seasons: {
          select: {
            id: true,
            name: true,
            episodes: {
              select: {
                id: true,
                name: true,
                episodeOrder: true,
                url: true,
                likes: true,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    const formattedLikes = animes.map((anime) => ({
      ...anime,
      likes: anime.likes.length,
      seasons: anime.seasons.map((season) => ({
        ...season,
        episodes: season.episodes.map((episode) => ({
          ...episode,
          likes: episode.likes.length,
        })),
      })),
    }));

    return formattedLikes;
  }

  async findByName(name: string) {
    const anime = await this.prisma.animes.findFirst({
      where: {
        name: { contains: name, mode: 'insensitive' },
      },
      select: {
        id: true,
        name: true,
        synopsis: true,
        thumbnailUrl: true,
        feature: true,
        classifications: {
          select: {
            name: true,
          },
        },
        categories: {
          select: {
            name: true,
          },
        },
        seasons: {
          select: {
            id: true,
            name: true,
            episodes: {
              select: {
                id: true,
                name: true,
                episodeOrder: true,
                url: true,
              },
            },
          },
        },
        likes: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const formattedLikes = {
      ...anime,
      likes: anime.likes.length,
    };

    return formattedLikes;
  }

  async findById(id: number) {
    const anime = await this.prisma.animes.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        synopsis: true,
        thumbnailUrl: true,
        feature: true,
        classifications: {
          select: {
            name: true,
          },
        },
        categories: {
          select: {
            name: true,
          },
        },
        seasons: {
          select: {
            id: true,
            name: true,
            episodes: {
              select: {
                id: true,
                name: true,
                episodeOrder: true,
                url: true,
              },
            },
          },
        },
        likes: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const formattedLikes = {
      ...anime,
      likes: anime.likes.length,
    };

    return formattedLikes;
  }

  async create(data: Prisma.AnimesCreateInput) {
    return this.prisma.animes.create({ data });
  }

  async update(id: number, data: Prisma.AnimesUpdateInput) {
    return this.prisma.animes.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.animes.delete({ where: { id } });
  }
}
