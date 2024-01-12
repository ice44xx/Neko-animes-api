import { Injectable } from '@nestjs/common';
import { CreateCommentsDto } from '../../dto/comments/create-comments-dto';
import { CommentsDto } from '../../dto/comments/comments-dto';
import { CommentsUseCase } from 'src/@core/domain/usecases/comments/comments.usecase';
import { UpdateCommentsDto } from '../../dto/comments/update-comments-dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsUseCase: CommentsUseCase) {}

  async findAll() {
    return await this.commentsUseCase.findAll();
  }

  async findAllByEpisode(episodeId: number) {
    return await this.commentsUseCase.findAllByEpisode(episodeId);
  }

  async findByUser(userId: number) {
    return await this.commentsUseCase.findByUser(userId);
  }

  async create(userId: number, createCommentsDto: CreateCommentsDto) {
    return await this.commentsUseCase.create(userId, createCommentsDto);
  }

  async update(userId: number, id: number, updateCommentsDto: UpdateCommentsDto) {
    return await this.commentsUseCase.update(userId, id, updateCommentsDto);
  }

  async remove({ userId, id }: CommentsDto) {
    return await this.commentsUseCase.remove({ userId, id });
  }
}
