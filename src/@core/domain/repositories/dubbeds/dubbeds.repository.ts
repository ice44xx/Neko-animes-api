import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DubbedsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.dubbeds.findMany();
  }

  async findById(id: number) {
    return this.prisma.dubbeds.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return this.prisma.dubbeds.findUnique({
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

  async create(data: Prisma.DubbedsCreateInput) {
    return this.prisma.dubbeds.create({ data });
  }

  async update(id: number, data: Prisma.DubbedsUpdateInput) {
    return this.prisma.dubbeds.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.dubbeds.delete({ where: { id } });
  }
}
