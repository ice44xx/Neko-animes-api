import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LikesAnimesRepository } from '../../repositories/likes/likes-animes.repository';
import { UsersRepository } from '../../repositories/users/users.repository';
import { AnimesRepository } from '../../repositories/animes/animes.repository';
import { LikesAnimesDto } from 'src/@core/app/dto/likes/create-likes-animes-dto';

@Injectable()
export class LikesAnimesUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly animesRepository: AnimesRepository,
    private readonly likesAnimesRepository: LikesAnimesRepository,
  ) {}

  async findAllLikesUser({ userId }: LikesAnimesDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const likes = await this.likesAnimesRepository.findAllLikesUser(user.id);

    return likes;
  }

  async create({ userId, animeId }: LikesAnimesDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const anime = await this.animesRepository.findById(animeId);

    if (!anime) {
      throw new NotFoundException('Anime não encontrado');
    }

    const newLike = await this.likesAnimesRepository.create({
      user: { connect: { id: userId } },
      anime: { connect: { id: animeId } },
      like: true,
    });

    return {
      animeId: newLike.animesId,
      anime: anime.name,
      like: newLike.like,
    };
  }

  async remove({ userId, animeId }: LikesAnimesDto) {
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

    await this.likesAnimesRepository.remove(animeId);
  }
}
