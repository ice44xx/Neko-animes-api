import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animes } from 'src/@core/domain/entities/animes/animes.entity';
import { LikesAnimes } from 'src/@core/domain/entities/likes-animes/likes-animes.entity';
import { Users } from 'src/@core/domain/entities/users/users.entity';
import { UnauthorizedError } from 'src/@core/infra/auth/errors/errors';
import { Repository } from 'typeorm';

@Injectable()
export class LikesAnimesService {
  constructor(
    @InjectRepository(LikesAnimes)
    private readonly likesRepository: Repository<LikesAnimes>,
    @InjectRepository(Animes)
    private readonly animesRepository: Repository<Animes>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getTopLikedAnimes() {
    try {
      const topAnimes = await this.animesRepository
        .createQueryBuilder('animes')
        .leftJoin('animes.likes', 'like')
        .select([
          'animes.id as id',
          'animes.name as name',
          'animes.thumbnailUrl as thumbnail',
          'COUNT(like.id) as likes',
        ])
        .groupBy('animes.id')
        .orderBy('likes', 'DESC')
        .limit(10)
        .getRawMany();

      return topAnimes;
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar os animes') + error.message;
    }
  }

  async createLike(userId: number, animeId: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new UnauthorizedError('Usuário não encontrado');
      }

      const anime = await this.animesRepository.findOne({ where: { id: animeId } });
      if (!anime) {
        throw new NotFoundException('Anime não encontrado');
      }

      const existingLike = await this.likesRepository.findOne({
        where: { user: { id: userId }, animes: { id: animeId } },
      });
      if (existingLike) {
        throw new ConflictException('Usuário já curtiu este anime');
      }

      const newLike = this.likesRepository.create({
        user: { id: userId },
        animes: { id: animeId },
      });

      return await this.likesRepository.save(newLike);
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar o like') + error.message;
    }
  }

  async deleteLike(userId: number, animeId: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new UnauthorizedError('Usuário não encontrado');
      }

      const anime = await this.animesRepository.findOne({ where: { id: animeId } });
      if (!anime) {
        throw new NotFoundException('Anime não encontrado');
      }

      const like = await this.likesRepository.findOne({
        where: { user: { id: userId }, animes: { id: animeId } },
      });

      if (!like) {
        throw new NotFoundException('Like não encontrado');
      }

      await this.likesRepository.remove(like);
    } catch (error) {
      throw new Error('Ocorreu um erro ao remover o like') + error.message;
    }
  }
}
