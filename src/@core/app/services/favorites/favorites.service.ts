import { Injectable } from '@nestjs/common';
import { FavoritesUseCase } from 'src/@core/domain/usecases/favorites/favorites.usecase';
import { FavoritesDto } from '../../dto/favorites/create-favorites-dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesUseCase: FavoritesUseCase) {}

  async findAllFavoritesUser({ userId }: FavoritesDto) {
    return await this.favoritesUseCase.findAllFavoritesUser({ userId });
  }

  async create({ userId, animeId }: FavoritesDto) {
    return await this.favoritesUseCase.create({ userId, animeId });
  }

  async remove({ userId, animeId }: FavoritesDto) {
    return await this.favoritesUseCase.remove({ userId, animeId });
  }
}
