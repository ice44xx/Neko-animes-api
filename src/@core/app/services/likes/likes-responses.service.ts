import { Injectable } from '@nestjs/common';
import { LikesResponsesCommentsUseCase } from 'src/@core/domain/usecases/likes/likes-responses.usecase';
import { LikesResponsesCommentsDto } from '../../dto/likes/create-likes-responses-dto';

@Injectable()
export class LikesResponsesCommentsService {
  constructor(private readonly likesResponsesCommentsUseCase: LikesResponsesCommentsUseCase) {}

  async findAllLikesUser({ userId }: LikesResponsesCommentsDto) {
    return await this.likesResponsesCommentsUseCase.findAllLikesUser({ userId });
  }

  async create({ userId, commentId }: LikesResponsesCommentsDto) {
    return await this.likesResponsesCommentsUseCase.create({ userId, commentId });
  }

  async remove({ userId, commentId }: LikesResponsesCommentsDto) {
    return await this.likesResponsesCommentsUseCase.remove(userId, commentId);
  }
}
