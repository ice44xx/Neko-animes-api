import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCommentsDto } from 'src/@core/app/dto/comments/create-comments-dto';
import { CommentsRepository } from '../../repositories/comments/comments.repository';
import { EpisodesRepository } from '../../repositories/episodes/episodes.repository';
import { UsersRepository } from '../../repositories/users/users.repository';
import { CommentsDto } from 'src/@core/app/dto/comments/comments-dto';
import { UpdateCommentsDto } from 'src/@core/app/dto/comments/update-comments-dto';

@Injectable()
export class CommentsUseCase {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly episodesRepository: EpisodesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async findAll() {
    return await this.commentsRepository.findAll();
  }

  async findAllByEpisode(episodeId: number) {
    const episode = await this.episodesRepository.findById(episodeId);

    if (!episode) {
      throw new NotFoundException('Episódio não encontrado');
    }

    return await this.commentsRepository.findAllByEpisode(episode.id);
  }

  async findByUser(userId: number) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return await this.commentsRepository.findByUser(user.id);
  }

  async create(userId: number, { episodeId, ...commentsData }: CreateCommentsDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais Inválidas');
    }

    const episode = await this.episodesRepository.findById(episodeId);

    if (!episode) {
      throw new NotFoundException('Episódio não encontrado');
    }

    const newComment = await this.commentsRepository.create({
      users: { connect: { id: userId } },
      episodes: { connect: { id: episodeId } },
      ...commentsData,
    });

    return newComment;
  }

  async update(userId: number, id: number, updateCommentsDto: UpdateCommentsDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais Inválidas');
    }

    const comment = await this.commentsRepository.findById(id);

    if (!comment) {
      throw new NotFoundException('Comentário não encontrado');
    }

    const updateComment = await this.commentsRepository.update(id, updateCommentsDto);

    return updateComment;
  }

  async remove({ userId, id }: CommentsDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais Inválidas');
    }

    const comment = await this.commentsRepository.findById(id);

    if (!comment) {
      throw new NotFoundException('Comentário não encontrado');
    }

    await this.commentsRepository.remove(id);
  }
}
