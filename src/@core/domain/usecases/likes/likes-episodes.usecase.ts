import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../../repositories/users/users.repository';
import { EpisodesRepository } from '../../repositories/episodes/episodes.repository';
import { LikesEpisodesDto } from 'src/@core/app/dto/likes/create-likes-episodes-dto';
import { LikesEpisodesRepository } from '../../repositories/likes/likes-episodes.repository';

@Injectable()
export class LikesEpisodesUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly episodesRepository: EpisodesRepository,
    private readonly likesEpisodesRepository: LikesEpisodesRepository,
  ) {}

  async findAllLikesUser({ userId }: LikesEpisodesDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const likes = await this.likesEpisodesRepository.findAllLikesUser(user.id);

    return likes;
  }

  async create({ userId, episodeId }: LikesEpisodesDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const episode = await this.episodesRepository.findById(episodeId);

    if (!episode) {
      throw new NotFoundException('Episódio não encontrado');
    }

    const newLike = await this.likesEpisodesRepository.create({
      user: { connect: { id: userId } },
      episodes: { connect: { id: episodeId } },
      like: true,
    });

    return {
      episodeId: newLike.episodesId,
      episode: episode.name,
      like: newLike.like,
    };
  }

  async remove({ userId, episodeId }: LikesEpisodesDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const episode = await this.episodesRepository.findById(episodeId);

    if (!episode) {
      throw new NotFoundException('Episódio não encontrado');
    }

    const like = await this.likesEpisodesRepository.findOne(userId, episodeId);

    if (!like) {
      throw new NotFoundException('Like não encontrado');
    }

    await this.likesEpisodesRepository.remove(userId, episodeId);
  }
}
