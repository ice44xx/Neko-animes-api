import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FavoritesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllFavoritesUser(userId: number) {
    const favorites = await this.prisma.favorites.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        animes: true,
      },
    });

    return favorites.map((favorite) => ({
      id: favorite.id,
      userId: favorite.userId,
      animeId: favorite.animes.id,
      anime: favorite.animes.name,
      thumbnailUrl: favorite.animes.thumbnailUrl,
    }));
  }

  async findOne(userId: number, animeId: number) {
    return this.prisma.favorites.findFirst({
      where: {
        userId,
        animesId: animeId,
      },
    });
  }

  async create(data: Prisma.FavoritesCreateInput) {
    return this.prisma.favorites.create({ data });
  }

  async remove(id: number) {
    return this.prisma.favorites.delete({ where: { id } });
  }
}
