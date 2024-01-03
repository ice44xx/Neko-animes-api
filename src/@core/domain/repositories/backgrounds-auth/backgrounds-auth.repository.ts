import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BackgroundsAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.backgroundsAuth.findMany({
      take: 6,
      orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async findById(id: number) {
    return this.prisma.backgroundsAuth.findUnique({ where: { id } });
  }

  async create(data: Prisma.BackgroundsAuthCreateInput) {
    return this.prisma.backgroundsAuth.create({ data });
  }

  async update(id: number, data: Prisma.BackgroundsAuthUpdateInput) {
    return this.prisma.backgroundsAuth.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.backgroundsAuth.delete({ where: { id } });
  }
}
