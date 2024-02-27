import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SeasonsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.seasons.findMany({
      orderBy: [{ id: 'desc' }, { order: 'asc' }],
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
            thumbnailUrl: true,
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
      orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        name: true,
        anime: {
          select: {
            id: true,
            name: true,
            synopsis: true,
            thumbnailUrl: true,
            background: true,
            status: true,
          },
        },
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
    });
  }

  async findByAnimeId(id: number) {
    return this.prisma.seasons.findMany({
      where: {
        anime: {
          id: id,
        },
      },
      select: {
        id: true,
        name: true,
        order: true,
        anime: {
          select: {
            id: true,
            name: true,
            types: true,
          },
        },
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
          },
        },
      },
    });
  }

  async findByFirst(animeId: number, name: string) {
    return this.prisma.seasons.findFirst({ where: { animeId, name } });
  }

  async findById(id: number) {
    return this.prisma.seasons.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        order: true,
        anime: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
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
