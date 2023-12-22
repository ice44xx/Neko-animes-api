import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LikesAnimesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(userId: number, animeId: number) {
    return this.prisma.likesAnimes.findFirst({
      where: {
        userId,
        animesId: animeId,
      },
    });
  }

  async create(data: Prisma.LikesAnimesCreateInput) {
    return this.prisma.likesAnimes.create({ data });
  }

  async remove(id: number) {
    return this.prisma.likesAnimes.delete({ where: { id } });
  }
}
