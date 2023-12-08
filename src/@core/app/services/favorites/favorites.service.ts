import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animes } from 'src/@core/domain/entities/animes/animes.entity';
import { Favorites } from 'src/@core/domain/entities/favorites/favorites.entity';
import { Users } from 'src/@core/domain/entities/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
    @InjectRepository(Animes)
    private readonly animesRepository: Repository<Animes>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async createFavorite(userId: number, animeId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const existingFavorite = await this.favoritesRepository.findOne({
      where: { users: { id: userId }, animes: { id: animeId } },
    });
    if (existingFavorite) {
      throw new ConflictException('Usuário já curtiu este anime');
    }

    const anime = await this.animesRepository.findOne({
      where: { id: animeId },
    });

    if (!anime) {
      throw new NotFoundException(`Anime id ${animeId} não encontrado`);
    }

    const favorite = await this.favoritesRepository.create({
      users: { id: userId },
      animes: { id: animeId },
    });

    return await this.favoritesRepository.save(favorite);
  }

  async removeFavorite(userId: number, animeId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites', 'favorites.animes'],
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const favoriteRemove = user.favorites.find(
      (favorite) => favorite.animes.id === animeId,
    );

    if (!favoriteRemove) {
      throw new NotFoundException('Anime favorito não encontrado');
    }

    await this.favoritesRepository.remove(favoriteRemove);
  }
}
