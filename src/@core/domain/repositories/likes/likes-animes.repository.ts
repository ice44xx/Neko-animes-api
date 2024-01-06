import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LikesAnimesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllLikesUser(userId: number) {
    const likes = await this.prisma.likesAnimes.findMany({
      where: { userId },
      select: {
        anime: true,
        like: true,
      },
    });

    return likes.map((like) => ({
      animeId: like.anime.id,
      anime: like.anime.name,
      like: like.like,
      thumbnailUrl: like.anime.thumbnailUrl,
    }));
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

  async remove(animeId: number) {
    return this.prisma.likesAnimes.deleteMany({ where: { animesId: animeId } });
  }
}
