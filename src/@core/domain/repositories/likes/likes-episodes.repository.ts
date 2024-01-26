import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LikesEpisodesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllLikesUser(userId: number) {
    const likes = await this.prisma.likesEpisodes.findMany({
      where: { userId },
      select: {
        episodes: true,
        like: true,
      },
    });

    return likes.map((like) => ({
      episodeId: like.episodes.id,
      episode: like.episodes.name,
      like: like.like,
    }));
  }

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

  async remove(userId: number, episodeId: number) {
    return this.prisma.likesEpisodes.deleteMany({ where: { userId, episodesId: episodeId } });
  }
}
