import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LikesAnimesRepository } from '../../repositories/likes/likes-animes.repository';
import { UsersRepository } from '../../repositories/users/users.repository';
import { AnimesRepository } from '../../repositories/animes/animes.repository';

@Injectable()
export class LikesAnimesUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly animesRepository: AnimesRepository,
    private readonly likesAnimesRepository: LikesAnimesRepository,
  ) {}

  async getTop10Likeds() {
    const animes = await this.likesAnimesRepository.getTop10Likeds();
    return animes;
  }

  async create(userId: number, animeId: number) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const anime = await this.animesRepository.findById(animeId);

    if (!anime) {
      throw new NotFoundException('Anime não encontrado');
    }

    const existingLike = await this.likesAnimesRepository.findOne(userId, animeId);

    if (existingLike) {
      throw new ConflictException('Usuário já curtiu este anime');
    }

    const newLike = await this.likesAnimesRepository.create({
      user: { connect: { id: userId } },
      anime: { connect: { id: animeId } },
    });

    return newLike;
  }

  async remove(userId: number, animeId: number) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const anime = await this.animesRepository.findById(animeId);

    if (!anime) {
      throw new NotFoundException('Anime não encontrado');
    }

    const like = await this.likesAnimesRepository.findOne(userId, animeId);

    if (!like) {
      throw new NotFoundException('Like não encontrado');
    }

    await this.likesAnimesRepository.remove(like.id);
  }
}
