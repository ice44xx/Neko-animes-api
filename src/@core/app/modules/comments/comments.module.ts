import { Module } from '@nestjs/common';
import { CommentsRepository } from 'src/@core/domain/repositories/comments/comments.repository';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { CommentsService } from '../../services/comments/comments.service';
import { CommentsUseCase } from 'src/@core/domain/usecases/comments/comments.usecase';
import { UsersRepository } from 'src/@core/domain/repositories/users/users.repository';
import { EpisodesRepository } from 'src/@core/domain/repositories/episodes/episodes.repository';
import { CommentsController } from '../../controller/comments/comments.controller';

@Module({
  controllers: [CommentsController],
  providers: [PrismaService, CommentsRepository, CommentsService, CommentsUseCase, UsersRepository, EpisodesRepository],
})
export class CommentsModule {}
