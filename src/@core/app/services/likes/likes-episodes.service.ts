import { Injectable } from '@nestjs/common';
import { LikesEpisodesUseCase } from 'src/@core/domain/usecases/likes/likes-episodes.usecase';
import { LikesEpisodesDto } from '../../dto/likes/create-likes-episodes-dto';

@Injectable()
export class LikesEpisodesService {
  constructor(private readonly likesEpisodesUseCase: LikesEpisodesUseCase) {}

  async findAllLikesUser({ userId }: LikesEpisodesDto) {
    return await this.likesEpisodesUseCase.findAllLikesUser({ userId });
  }

  async create({ userId, episodeId }: LikesEpisodesDto) {
    return await this.likesEpisodesUseCase.create({ userId, episodeId });
  }

  async remove({ userId, episodeId }: LikesEpisodesDto) {
    return await this.likesEpisodesUseCase.remove({ userId, episodeId });
  }
}
