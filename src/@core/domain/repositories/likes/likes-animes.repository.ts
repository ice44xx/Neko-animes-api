import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LikesAnimesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTop10Likeds() {
    const top10LikedAnimes = await this.prisma.likesAnimes.groupBy({
      by: ['animesId'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: 10,
    });

    const top10LikedAnimesWithNames = await Promise.all(
      top10LikedAnimes.map(async (likedAnime) => {
        const animeInfo = await this.prisma.animes.findUnique({
          where: {
            id: likedAnime.animesId,
          },
          select: {
            id: true,
            name: true,
            thumbnailUrl: true,
          },
        });
        return {
          ...animeInfo,
          likes: likedAnime._count.id,
        };
      }),
    );

    return top10LikedAnimesWithNames;
  }

  async findOne(userId: number, animeId: number) {
    return this.prisma.likesAnimes.findFirst({
      where: {
        userId,
        animesId: animeId,
      },
    });
  }

  async create(data: Prisma.LikesAnimesCreateInput) {
    return this.prisma.likesAnimes.create({ data });
  }

  async remove(id: number) {
    return this.prisma.likesAnimes.delete({ where: { id } });
  }
}
