import { Injectable } from '@nestjs/common';
import { LikesAnimesUseCase } from 'src/@core/domain/usecases/likes/likes-animes.usecase';
import { LikesAnimesDto } from '../../dto/likes/create-likes-animes-dto';

@Injectable()
export class LikesAnimesService {
  constructor(private readonly likesAnimesUseCase: LikesAnimesUseCase) {}

  async create({ userId, animeId }: LikesAnimesDto) {
    return await this.likesAnimesUseCase.create({ userId, animeId });
  }

  async remove({ userId, animeId }: LikesAnimesDto) {
    return await this.likesAnimesUseCase.remove({ userId, animeId });
  }
}
