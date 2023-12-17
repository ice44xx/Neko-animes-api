import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AnimesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.animes.findMany({
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
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByName(name: string) {
    return this.prisma.animes.findFirst({
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
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findById(id: number) {
    return this.prisma.animes.findUnique({ where: { id } });
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
