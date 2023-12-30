import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.categories.findMany();
  }

  async findById(id: number) {
    return this.prisma.categories.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return this.prisma.categories.findUnique({
      where: { name },
      select: {
        animes: {
          select: {
            id: true,
            name: true,
            synopsis: true,
            thumbnailUrl: true,
          },
        },
      },
    });
  }

  async findManyByNames(names: string[]) {
    return this.prisma.categories.findMany({
      where: {
        name: {
          in: names,
        },
      },
    });
  }

  async create(data: Prisma.CategoriesCreateInput) {
    return this.prisma.categories.create({ data });
  }

  async update(id: number, data: Prisma.CategoriesUpdateInput) {
    return this.prisma.categories.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.categories.delete({ where: { id } });
  }
}
