import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClassificationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.classifications.findMany();
  }

  async findById(id: number) {
    return this.prisma.classifications.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return this.prisma.classifications.findUnique({ where: { name } });
  }

  async create(data: Prisma.ClassificationsCreateInput) {
    return this.prisma.classifications.create({ data });
  }

  async update(id: number, data: Prisma.ClassificationsCreateInput) {
    return this.prisma.classifications.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.classifications.delete({ where: { id } });
  }
}
