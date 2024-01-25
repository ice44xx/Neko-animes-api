import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CodesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.codes.findMany();
  }

  async findByCode(code: number) {
    return this.prisma.codes.findUnique({ where: { code } });
  }

  async create(data: Prisma.CodesCreateInput) {
    return this.prisma.codes.create({ data });
  }

  async deleteByCode(code: number) {
    return this.prisma.codes.delete({ where: { code } });
  }

  async delete(id: number) {
    return this.prisma.codes.delete({ where: { id } });
  }
}
