import { Module } from '@nestjs/common';
import { CommentsRepository } from 'src/@core/domain/repositories/comments/comments.repository';
import { LikesCommentsRepository } from 'src/@core/domain/repositories/likes/likes-comments.repository';
import { UsersRepository } from 'src/@core/domain/repositories/users/users.repository';
import { LikesCommentsUseCase } from 'src/@core/domain/usecases/likes/likes-comments.usecase';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { LikesCommentsService } from '../../services/likes/likes-comments.service';
import { LikesCommentsController } from '../../controller/likes/likes-comments.controller';

@Module({
  controllers: [LikesCommentsController],
  providers: [
    PrismaService,
    LikesCommentsRepository,
    LikesCommentsUseCase,
    LikesCommentsService,
    UsersRepository,
    CommentsRepository,
  ],
})
export class LikesCommentsModule {}
