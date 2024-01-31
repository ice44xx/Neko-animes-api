import { Module } from '@nestjs/common';
import { CommentsRepository } from 'src/@core/domain/repositories/comments/comments.repository';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { ResponsesRepository } from 'src/@core/domain/repositories/comments/responses.repository';
import { ResponsesUseCase } from 'src/@core/domain/usecases/comments/responses.usecase';
import { ResponsesService } from '../../services/comments/responses.service';
import { ResponsesController } from '../../controller/comments/responses.controller';
import { UsersRepository } from 'src/@core/domain/repositories/users/users.repository';

@Module({
  controllers: [ResponsesController],
  providers: [PrismaService, ResponsesRepository, ResponsesUseCase, ResponsesService, CommentsRepository, UsersRepository],
})
export class ResponsesModule {}
