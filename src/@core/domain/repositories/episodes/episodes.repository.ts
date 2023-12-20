import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EpisodesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.episodes.findMany({
      select: {
        id: true,
        name: true,
        episodeOrder: true,
        url: true,
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
      },
    });
  }

  async findById(id: number) {
    return this.prisma.episodes.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        episodeOrder: true,
        url: true,
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
