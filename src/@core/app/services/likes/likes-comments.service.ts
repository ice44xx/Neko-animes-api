import { Injectable } from '@nestjs/common';
import { LikesCommentsDto } from '../../dto/likes/create-likes-comments-dto';
import { LikesCommentsUseCase } from 'src/@core/domain/usecases/likes/likes-comments.usecase';

@Injectable()
export class LikesCommentsService {
  constructor(private readonly likesCommentsUseCase: LikesCommentsUseCase) {}

  async create({ userId, commentId }: LikesCommentsDto) {
    return await this.likesCommentsUseCase.create({ userId, commentId });
  }

  async remove({ userId, commentId }: LikesCommentsDto) {
    return await this.likesCommentsUseCase.remove({ userId, commentId });
  }
}
