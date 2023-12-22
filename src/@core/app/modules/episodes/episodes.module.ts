import { Module } from '@nestjs/common';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { EpisodesService } from '../../services/episodes/episodes.service';
import { EpisodesUseCase } from 'src/@core/domain/usecases/episodes/episodes.usecase';
import { EpisodesRepository } from 'src/@core/domain/repositories/episodes/episodes.repository';
import { SeasonsRepository } from 'src/@core/domain/repositories/seasons/seasons.repository';
import { EpisodesController } from '../../controller/episodes/episodes.controller';

@Module({
  controllers: [EpisodesController],
  providers: [
    PrismaService,
    EpisodesService,
    EpisodesUseCase,
    EpisodesRepository,
    SeasonsRepository,
  ],
})
export class EpisodesModule {}
