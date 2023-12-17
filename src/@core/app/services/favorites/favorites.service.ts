import { Injectable } from '@nestjs/common';
import { FavoritesUseCase } from 'src/@core/domain/usecases/favorites/favorites.usecase';
import { CreateFavoritesDto } from '../../dto/favorites/create-favorites-dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesUseCase: FavoritesUseCase) {}

  async findAllFavoritesUser({ userId }: CreateFavoritesDto) {
    return await this.favoritesUseCase.findAllFavoritesUser({ userId });
  }

  async create(createFavoritesDto: CreateFavoritesDto) {
    return await this.favoritesUseCase.create(createFavoritesDto);
  }

  async remove(deleteFavoritesDto: CreateFavoritesDto) {
    return await this.favoritesUseCase.remove(deleteFavoritesDto);
  }
}
