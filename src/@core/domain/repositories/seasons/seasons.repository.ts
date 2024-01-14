import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SeasonsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.seasons.findMany({
      select: {
        id: true,
        name: true,
        anime: {
          select: {
            id: true,
            name: true,
            synopsis: true,
            thumbnailUrl: true,
          },
        },
        episodes: {
          select: {
            id: true,
            name: true,
            url: true,
            episodeOrder: true,
            likes: true,
          },
        },
      },
    });
  }

  async findByName(name: string) {
    return this.prisma.seasons.findMany({
      where: { name: { contains: name, mode: 'insensitive' } },
      select: {
        id: true,
        name: true,
        anime: {
          select: {
            id: true,
            name: true,
            synopsis: true,
            thumbnailUrl: true,
            status: true,
          },
        },
        episodes: {
          select: {
            id: true,
            name: true,
            url: true,
            episodeOrder: true,
            likes: true,
          },
        },
      },
    });
  }

  async findByFirst(animeId: number, name: string) {
    return this.prisma.seasons.findFirst({ where: { animeId, name } });
  }

  async findById(id: number) {
    return this.prisma.seasons.findUnique({ where: { id } });
  }

  async create(data: Prisma.SeasonsCreateInput) {
    return this.prisma.seasons.create({ data });
  }

  async update(id: number, data: Prisma.SeasonsUpdateInput) {
    return this.prisma.seasons.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.seasons.delete({ where: { id } });
  }
}
