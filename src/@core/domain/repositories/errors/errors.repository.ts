import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ErrorsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.errors.findMany({ orderBy: { episodeId: 'asc' } });
  }

  async findByError(episodeId: number) {
    return this.prisma.errors.findUnique({ where: { episodeId } });
  }

  async create(data: Prisma.ErrorsCreateInput) {
    return this.prisma.errors.create({ data });
  }

  async delete(episodeId: number) {
    return this.prisma.errors.deleteMany({ where: { episodeId } });
  }
}
