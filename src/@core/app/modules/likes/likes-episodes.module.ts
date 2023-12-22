import { Module } from '@nestjs/common';
import { EpisodesRepository } from 'src/@core/domain/repositories/episodes/episodes.repository';
import { LikesEpisodesRepository } from 'src/@core/domain/repositories/likes/likes-episodes.repository';
import { UsersRepository } from 'src/@core/domain/repositories/users/users.repository';
import { LikesEpisodesUseCase } from 'src/@core/domain/usecases/likes/likes-episodes.usecase';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { LikesEpisodesService } from '../../services/likes/likes-episodes.service';
import { LikesEpisodesController } from '../../controller/likes/likes-episodes.controller';

@Module({
  controllers: [LikesEpisodesController],
  providers: [
    PrismaService,
    LikesEpisodesService,
    LikesEpisodesUseCase,
    LikesEpisodesRepository,
    UsersRepository,
    EpisodesRepository,
  ],
})
export class LikesEpisodesModule {}
