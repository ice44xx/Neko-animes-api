import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AnimesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.AnimesCreateInput) {
    return this.prisma.animes.create({ data });
  }

  async findAll() {}

  async findByName(name: string) {
    return this.prisma.animes.findFirst({ where: { name } });
  }

  async update(id: number, data: Prisma.AnimesUpdateInput) {
    return this.prisma.animes.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.animes.delete({ where: { id } });
  }
}
