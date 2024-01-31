import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommentsRepository } from '../../repositories/comments/comments.repository';
import { ResponsesRepository } from '../../repositories/comments/responses.repository';
import { CreateResponsesDto } from 'src/@core/app/dto/comments/create-responses-dto';
import { ResponsesDto } from 'src/@core/app/dto/comments/responses-dto';
import { UsersRepository } from '../../repositories/users/users.repository';

@Injectable()
export class ResponsesUseCase {
  constructor(
    private readonly responsesRepository: ResponsesRepository,
    private readonly commentsRepository: CommentsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(userId: number, { commentId, text, ...responsesData }: CreateResponsesDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const comment = await this.commentsRepository.findById(commentId);

    if (!comment) {
      throw new NotFoundException('Comentário não encontrado.');
    }

    const newCommentResponse = await this.responsesRepository.create({
      comments: { connect: { id: commentId } },
      users: { connect: { id: userId } },
      text: text,
      ...responsesData,
    });

    return newCommentResponse;
  }

  async remove({ userId, id }: ResponsesDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    await this.responsesRepository.remove(id);
  }
}
