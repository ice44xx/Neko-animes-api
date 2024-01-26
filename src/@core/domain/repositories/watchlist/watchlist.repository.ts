import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';

@Injectable()
export class WatchlistRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findLastTen(userId: number) {
    return this.prisma.watchList.findMany({
      where: { userId },
      take: 10,
      orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async findByEpisodeId(userId: number, episodeId: number) {
    return this.prisma.watchList.findFirst({
      where: {
        userId,
        episodeId,
      },
    });
  }

  async findByOne(userId: number, id: number) {
    return this.prisma.watchList.findUnique({ where: { userId, id } });
  }

  async create(data: Prisma.WatchListCreateInput) {
    return this.prisma.watchList.create({ data });
  }

  async update(id: number, data: Prisma.WatchListUpdateInput) {
    return this.prisma.watchList.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.watchList.delete({ where: { id } });
  }
}
