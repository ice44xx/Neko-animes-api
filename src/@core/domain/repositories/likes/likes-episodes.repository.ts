import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LikesEpisodesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(userId: number, episodeId: number) {
    return this.prisma.likesEpisodes.findFirst({
      where: {
        userId: userId,
        episodesId: episodeId,
      },
    });
  }

  async create(data: Prisma.LikesEpisodesCreateInput) {
    return this.prisma.likesEpisodes.create({ data });
  }

  async remove(id: number) {
    return this.prisma.likesEpisodes.delete({ where: { id } });
  }
}
