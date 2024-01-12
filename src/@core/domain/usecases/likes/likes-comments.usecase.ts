import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users/users.repository';
import { CommentsRepository } from '../../repositories/comments/comments.repository';
import { LikesCommentsDto } from 'src/@core/app/dto/likes/create-likes-comments-dto';
import { LikesCommentsRepository } from '../../repositories/likes/likes-comments.repository';

@Injectable()
export class LikesCommentsUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly commentsRepository: CommentsRepository,
    private readonly likesCommentsRepository: LikesCommentsRepository,
  ) {}

  async findAllLikesUser({ userId }: LikesCommentsDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const likes = await this.likesCommentsRepository.findAllLikesUser(user.id);

    return likes;
  }

  async create({ userId, commentId }: LikesCommentsDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const comment = await this.commentsRepository.findById(commentId);

    if (!comment) {
      throw new NotFoundException('Comentário não encontrado');
    }

    const newLike = await this.likesCommentsRepository.create({
      users: { connect: { id: userId } },
      comments: { connect: { id: commentId } },
      like: true,
    });

    return {
      commentId: newLike.commentsId,
      user: newLike.usersId,
      like: newLike.like,
    };
  }

  async remove(userId: number, commentId: number) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const comment = await this.commentsRepository.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comentário não encontrado');
    }

    const removedLikes = await this.likesCommentsRepository.remove(userId, commentId);

    return removedLikes;
  }
}
