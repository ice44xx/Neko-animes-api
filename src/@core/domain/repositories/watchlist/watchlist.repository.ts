import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';

@Injectable()
export class WatchlistRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findLastTen() {
    return this.prisma.watchList.findMany();
  }

  async create(data: Prisma.WatchListCreateInput) {
    return this.prisma.watchList.create({ data });
  }

  async remove(id: number) {
    return this.prisma.watchList.delete({ where: { id } });
  }
}
