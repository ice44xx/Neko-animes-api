import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from 'src/@core/domain/entities/comments/comments.entity';
import { Episodes } from 'src/@core/domain/entities/episodes/episodes.entity';
import { Users } from 'src/@core/domain/entities/users/users.entity';
import { Repository } from 'typeorm';
import { CreateCommentsDto } from '../../dto/requests/comments/create-comments-dto';
import { UpdateCommentsDto } from '../../dto/requests/comments/update-comments-dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
    @InjectRepository(Episodes)
    private readonly episodesRepository: Repository<Episodes>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findByUser(userId: number) {
    try {
      const user = await this.usersRepository.findOne({
        relations: ['comments', 'comments.episodes'],
        where: { id: userId },
      });

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const commentsWithEpisodeDetails = user.comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        episode: {
          id: comment.episodes.id,
          name: comment.episodes.name,
        },
      }));

      return commentsWithEpisodeDetails;
    } catch (error) {
      throw (
        new Error('Ocorreu um erro ao encontrar o comentário do usuário') + error.message
      );
    }
  }

  async findAllByEpisode(episodeId: number) {
    try {
      const episode = await this.episodesRepository.findOne({
        relations: ['comments'],
        where: { id: episodeId },
      });

      if (!episode) {
        throw new NotFoundException('Episódio não encontrado');
      }

      return episode.comments;
    } catch (error) {
      new Error('Ocorreu um erro ao encontrar o comentário do episódio') + error.message;
    }
  }

  async create(userId: number, createCommentDto: CreateCommentsDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const episode = await this.episodesRepository.findOne({
        where: { id: createCommentDto.episodeId },
      });

      if (!episode) {
        throw new NotFoundException('Episódio não encontrado');
      }

      const comment = this.commentsRepository.create({
        users: { id: userId },
        episodes: { id: createCommentDto.episodeId },
        text: createCommentDto.text,
      });

      return await this.commentsRepository.save(comment);
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar o comentário') + error.message;
    }
  }

  async update(userId: number, id: number, updateCommentsDto: UpdateCommentsDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const comment = await this.commentsRepository.findOne({
        where: { id, users: { id: userId } },
      });

      if (!comment) {
        throw new NotFoundException('Comentário não encontrado.');
      }

      comment.text = updateCommentsDto.text;
      await this.commentsRepository.save(comment);
      return comment;
    } catch (error) {
      throw new Error('Ocorreu um erro ao atualizar o comentário, ' + error.message);
    }
  }

  async delete(userId: number, textId: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const comment = await this.commentsRepository.findOne({
        where: { id: textId },
      });

      if (!comment) {
        throw new NotFoundException('Comentário não encontrado.');
      }

      return await this.commentsRepository.delete(textId);
    } catch (error) {
      throw new Error('Ocorreu um erro ao deletar o comentário, ') + error.message;
    }
  }
}
