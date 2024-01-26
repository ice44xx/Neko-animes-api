import { Module } from '@nestjs/common';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { SeasonsService } from '../../services/seasons/seasons.service';
import { SeasonsRepository } from 'src/@core/domain/repositories/seasons/seasons.repository';
import { AnimesRepository } from 'src/@core/domain/repositories/animes/animes.repository';
import { SeasonsController } from '../../controller/seasons/seasons.controller';
import { SeasonsUseCase } from 'src/@core/domain/usecases/seasons/seasons.usecase';

@Module({
  controllers: [SeasonsController],
  providers: [PrismaService, SeasonsService, SeasonsRepository, SeasonsUseCase, AnimesRepository],
})
export class SeasonsModule {}
