import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BackgroundsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.backgrounds.findMany({
      take: 5,
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findById(id: number) {
    return this.prisma.backgrounds.findUnique({ where: { id } });
  }

  async create(data: Prisma.BackgroundsCreateInput) {
    return this.prisma.backgrounds.create({ data });
  }

  async update(id: number, data: Prisma.BackgroundsUpdateInput) {
    return this.prisma.backgrounds.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.backgrounds.delete({ where: { id } });
  }
}
