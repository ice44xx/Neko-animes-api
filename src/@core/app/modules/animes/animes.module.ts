import { Module } from '@nestjs/common';
import { AnimesController } from '../../controller/animes/animes.controller';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { AnimesService } from '../../services/animes/animes.service';
import { AnimesUseCase } from 'src/@core/domain/usecases/animes/animes.usecase';
import { AnimesRepository } from 'src/@core/domain/repositories/animes/animes.repository';
import { CategoriesRepository } from 'src/@core/domain/repositories/categories/categories.repository';

@Module({
  controllers: [AnimesController],
  providers: [
    PrismaService,
    AnimesService,
    AnimesUseCase,
    AnimesRepository,
    CategoriesRepository,
  ],
  exports: [AnimesService],
})
export class AnimesModule {}
