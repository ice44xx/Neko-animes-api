import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.RolesCreateInput) {
    return this.prisma.roles.create({ data });
  }

  async findAll() {
    return this.prisma.roles.findMany();
  }

  async findOneByName(name: string) {
    return this.prisma.roles.findFirst({ where: { name } });
  }

  async delete(id: number) {
    return this.prisma.roles.delete({ where: { id } });
  }
}
