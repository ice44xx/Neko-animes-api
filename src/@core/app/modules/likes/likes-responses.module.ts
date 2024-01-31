import { Module } from '@nestjs/common';
import { UsersRepository } from 'src/@core/domain/repositories/users/users.repository';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { LikesResponsesCommentsRepository } from 'src/@core/domain/repositories/likes/likes-reponses.repository';
import { LikesResponsesCommentsUseCase } from 'src/@core/domain/usecases/likes/likes-responses.usecase';
import { LikesResponsesCommentsService } from '../../services/likes/likes-responses.service';
import { ResponsesRepository } from 'src/@core/domain/repositories/comments/responses.repository';
import { LikesResponsesCommentsController } from '../../controller/likes/likes-responses.controller';

@Module({
  controllers: [LikesResponsesCommentsController],
  providers: [
    PrismaService,
    LikesResponsesCommentsRepository,
    LikesResponsesCommentsUseCase,
    LikesResponsesCommentsService,
    UsersRepository,
    ResponsesRepository,
  ],
})
export class LikesResponsesCommentsModule {}
