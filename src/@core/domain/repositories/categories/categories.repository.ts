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
    return this.prisma.categories.findUnique({ where: { name } });
  }

  async create(data: Prisma.CategoriesCreateInput) {
    return this.prisma.categories.create({ data });
  }

  async update(id: number, data: Prisma.CategoriesUpdateInput) {
    return this.prisma.categories.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.categories.delete({ where: { id } });
  }
}
