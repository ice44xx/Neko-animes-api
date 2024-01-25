import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TypesAnimesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.typesAnimes.findMany();
  }

  async findById(id: number) {
    return this.prisma.typesAnimes.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return this.prisma.typesAnimes.findUnique({
      where: { name },
      select: {
        animes: {
          select: {
            id: true,
            name: true,
            synopsis: true,
            thumbnailUrl: true,
            dubbeds: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.TypesAnimesCreateInput) {
    return this.prisma.typesAnimes.create({ data });
  }

  async update(id: number, data: Prisma.AnimesUpdateInput) {
    return this.prisma.typesAnimes.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.typesAnimes.delete({ where: { id } });
  }
}
