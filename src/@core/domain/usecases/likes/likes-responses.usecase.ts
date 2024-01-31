import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users/users.repository';
import { LikesResponsesCommentsDto } from 'src/@core/app/dto/likes/create-likes-responses-dto';
import { LikesResponsesCommentsRepository } from '../../repositories/likes/likes-reponses.repository';
import { ResponsesRepository } from '../../repositories/comments/responses.repository';

@Injectable()
export class LikesResponsesCommentsUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly likesResponsesCommentsRepository: LikesResponsesCommentsRepository,
    private readonly responseRepository: ResponsesRepository,
  ) {}

  async findAllLikesUser({ userId }: LikesResponsesCommentsDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const likes = await this.likesResponsesCommentsRepository.findAllLikesUser(user.id);

    return likes;
  }

  async create({ userId, commentId }: LikesResponsesCommentsDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const newLike = await this.likesResponsesCommentsRepository.create({
      users: { connect: { id: userId } },
      commentResponses: { connect: { id: commentId } },
      like: true,
    });

    return {
      commentId: newLike.commentResponsesId,
      user: newLike.usersId,
      like: newLike.like,
    };
  }

  async remove(userId: number, commentId: number) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const comment = await this.responseRepository.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comentário não encontrado');
    }

    const removedLikes = await this.likesResponsesCommentsRepository.remove(userId, commentId);

    return removedLikes;
  }
}
