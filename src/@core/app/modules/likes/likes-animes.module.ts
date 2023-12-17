import { Module } from '@nestjs/common';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { LikesAnimesRepository } from 'src/@core/domain/repositories/likes/likes-animes.repository';
import { LikesAnimesUseCase } from 'src/@core/domain/usecases/likes/likes-animes.usecase';
import { LikesAnimesService } from '../../services/likes/likes-animes.service';
import { UsersRepository } from 'src/@core/domain/repositories/users/users.repository';
import { AnimesRepository } from 'src/@core/domain/repositories/animes/animes.repository';
import { LikesAnimesController } from '../../controller/likes/likes-animes.controller';

@Module({
  controllers: [LikesAnimesController],
  providers: [
    PrismaService,
    LikesAnimesRepository,
    LikesAnimesUseCase,
    LikesAnimesService,
    UsersRepository,
    AnimesRepository,
  ],
  exports: [LikesAnimesService],
})
export class LikesAnimesModule {}
