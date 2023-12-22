import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FavoritesRepository } from '../../repositories/favorites/favorites.repository';
import { UsersRepository } from '../../repositories/users/users.repository';
import { CreateFavoritesDto } from 'src/@core/app/dto/favorites/create-favorites-dto';
import { AnimesRepository } from '../../repositories/animes/animes.repository';

@Injectable()
export class FavoritesUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly animesRepository: AnimesRepository,
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  async findAllFavoritesUser({ userId }: CreateFavoritesDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const favorites = await this.favoritesRepository.findAllFavoritesUser(user.id);

    if (favorites.length === 0) {
      return {
        message: 'Lista de favoritos está vazia',
      };
    }

    return favorites;
  }

  async create({ userId, animeId }: CreateFavoritesDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const existingFavorite = await this.favoritesRepository.findOne(userId, animeId);

    if (existingFavorite) {
      throw new ConflictException('Anime já adicionado aos favoritos');
    }

    const anime = await this.animesRepository.findById(animeId);

    if (!anime) {
      throw new NotFoundException('Anime não encontrado');
    }

    const favorite = await this.favoritesRepository.create({
      user: { connect: { id: userId } },
      animes: { connect: { id: animeId } },
    });

    return {
      id: favorite.id,
      animeId: anime.id,
      anime: anime.name,
    };
  }

  async remove({ userId, animeId }: CreateFavoritesDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const anime = await this.animesRepository.findById(animeId);

    await this.favoritesRepository.remove(anime.id);
  }
}
