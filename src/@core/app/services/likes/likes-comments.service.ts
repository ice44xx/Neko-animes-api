import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from 'src/@core/domain/entities/comments/comments.entity';
import { LikesComments } from 'src/@core/domain/entities/likes-comments/likes-comments';
import { Users } from 'src/@core/domain/entities/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikesCommentsService {
  constructor(
    @InjectRepository(LikesComments)
    private readonly likesRepository: Repository<LikesComments>,
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async createLike(userId: number, commentId: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }

      const comment = await this.commentsRepository.findOne({ where: { id: commentId } });
      if (!comment) {
        throw new NotFoundException('Comentário não encontrado');
      }

      const existingLike = await this.likesRepository.findOne({
        where: { user: { id: userId }, comments: { id: commentId } },
      });
      if (existingLike) {
        throw new ConflictException('Usuário já curtiu este comentário');
      }

      const newLike = this.likesRepository.create({
        user: { id: userId },
        comments: { id: commentId },
      });

      return await this.likesRepository.save(newLike);
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar o like') + error.message;
    }
  }

  async deleteLike(userId: number, commentId: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }

      const episode = await this.commentsRepository.findOne({ where: { id: commentId } });
      if (!episode) {
        throw new NotFoundException('Comentário não encontrado');
      }

      const like = await this.likesRepository.findOne({
        where: { user: { id: userId }, comments: { id: commentId } },
      });

      if (!like) {
        throw new NotFoundException('Like não encontrado');
      }

      await this.likesRepository.remove(like);
    } catch (error) {
      throw new Error('Ocorreu um erro ao remover o like' + error.message);
    }
  }
}
