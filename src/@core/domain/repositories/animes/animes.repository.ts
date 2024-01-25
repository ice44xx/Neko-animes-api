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
        background: true,
        feature: true,
        year: true,
        status: true,
        dubbeds: {
          select: {
            name: true,
          },
        },
        types: {
          select: {
            name: true,
          },
        },
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
          orderBy: {
            order: 'asc',
          },
          select: {
            id: true,
            name: true,
            order: true,
            episodes: {
              select: {
                id: true,
                name: true,
                url: true,
                thumbnailUrl: true,
                episodeOrder: true,
                likes: true,
                comments: {
                  select: {
                    id: true,
                    usersId: true,
                    text: true,
                    likes: true,
                    createdAt: true,
                  },
                },
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
          comments: episode.comments.map((comment) => ({
            ...comment,
            likes: comment.likes.length,
          })),
        })),
      })),
    }));

    return formattedLikes;
  }

  async findAllFeature() {
    const animes = await this.prisma.animes.findMany({
      where: { feature: true },
      select: {
        id: true,
        name: true,
        synopsis: true,
        thumbnailUrl: true,
        background: true,
        feature: true,
        year: true,
        status: true,
        dubbeds: {
          select: {
            name: true,
          },
        },
        types: {
          select: {
            name: true,
          },
        },
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
          orderBy: {
            order: 'asc',
          },
          select: {
            id: true,
            name: true,
            order: true,
            episodes: {
              select: {
                id: true,
                name: true,
                url: true,
                thumbnailUrl: true,
                episodeOrder: true,
                likes: true,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      take: 10,
      orderBy: {
        updatedAt: 'desc',
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

  async findTopNewest() {
    const animes = await this.prisma.animes.findMany({
      select: {
        id: true,
        name: true,
        synopsis: true,
        thumbnailUrl: true,
        background: true,
        feature: true,
        year: true,
        status: true,
        dubbeds: {
          select: {
            name: true,
          },
        },
        types: {
          select: {
            name: true,
          },
        },
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
          orderBy: {
            order: 'asc',
          },
          select: {
            id: true,
            name: true,
            order: true,
            episodes: {
              select: {
                id: true,
                name: true,
                url: true,
                thumbnailUrl: true,
                episodeOrder: true,
                likes: true,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      take: 10,
      orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
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

  async findTopLikes() {
    const animes = await this.prisma.animes.findMany({
      select: {
        id: true,
        name: true,
        synopsis: true,
        thumbnailUrl: true,
        background: true,
        feature: true,
        year: true,
        status: true,
        dubbeds: {
          select: {
            name: true,
          },
        },
        types: {
          select: {
            name: true,
          },
        },
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
          orderBy: {
            order: 'asc',
          },
          select: {
            id: true,
            name: true,
            order: true,
            episodes: {
              select: {
                id: true,
                name: true,
                url: true,
                thumbnailUrl: true,
                episodeOrder: true,
                likes: true,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      take: 10,
      orderBy: {
        likes: {
          _count: 'desc',
        },
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

  async findTopDub() {
    return await this.prisma.animes.findMany({
      where: {
        dubbeds: {
          id: 1,
        },
      },
      select: {
        id: true,
        name: true,
        synopsis: true,
        thumbnailUrl: true,
        background: true,
        feature: true,
        year: true,
        status: true,
        dubbeds: {
          select: {
            name: true,
          },
        },
        types: {
          select: {
            name: true,
          },
        },
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
      },
      take: 10,
      orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async findByName(name: string) {
    const anime = await this.prisma.animes.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
      },
      select: {
        id: true,
        name: true,
        synopsis: true,
        thumbnailUrl: true,
        background: true,
        feature: true,
        year: true,
        status: true,
        dubbeds: {
          select: {
            name: true,
          },
        },
        types: {
          select: {
            name: true,
          },
        },
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
          orderBy: {
            order: 'asc',
          },
          select: {
            id: true,
            name: true,
            order: true,
            episodes: {
              select: {
                id: true,
                name: true,
                url: true,
                thumbnailUrl: true,
                episodeOrder: true,
                likes: true,
                comments: {
                  select: {
                    id: true,
                    usersId: true,
                    text: true,
                    likes: true,
                    createdAt: true,
                  },
                },
              },
            },
          },
        },
        likes: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const formattedAnimes = anime.map((anime) => ({
      ...anime,
      likes: anime.likes.length,
      seasons: anime.seasons.map((season) => ({
        ...season,
        episodes: season.episodes.map((episode) => ({
          ...episode,
          likes: episode.likes.length,
          comments: episode.comments.map((comment) => ({
            ...comment,
            likes: comment.likes.length,
          })),
        })),
      })),
    }));

    return formattedAnimes;
  }

  async findById(id: number) {
    const anime = await this.prisma.animes.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        synopsis: true,
        thumbnailUrl: true,
        background: true,
        feature: true,
        year: true,
        status: true,
        dubbeds: {
          select: {
            name: true,
          },
        },
        types: {
          select: {
            name: true,
          },
        },
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
          orderBy: {
            order: 'asc',
          },
          select: {
            id: true,
            name: true,
            order: true,
            episodes: {
              orderBy: {
                episodeOrder: 'asc',
              },
              select: {
                id: true,
                name: true,
                url: true,
                thumbnailUrl: true,
                episodeOrder: true,
                likes: true,
                comments: {
                  select: {
                    id: true,
                    usersId: true,
                    text: true,
                    likes: true,
                    createdAt: true,
                  },
                },
              },
            },
          },
        },
        likes: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const formattedAnime = {
      ...anime,
      likes: anime.likes.length,
      seasons: anime.seasons.map((season) => ({
        ...season,
        episodes: season.episodes.map((episode) => ({
          ...episode,
          likes: episode.likes.length,
          comments: episode.comments.map((comment) => ({
            ...comment,
            likes: comment.likes.length,
          })),
        })),
      })),
    };

    return formattedAnime;
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
