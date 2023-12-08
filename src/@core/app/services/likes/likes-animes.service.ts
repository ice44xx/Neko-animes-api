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

  async createLike(userId: number, animeId: number) {
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
  }

  async deleteLike(userId: number, animeId: number) {
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
  }
}
