import { Module } from '@nestjs/common';
import { AnimesController } from '../../controller/animes/animes.controller';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { AnimesService } from '../../services/animes/animes.service';
import { AnimesUseCase } from 'src/@core/domain/usecases/animes/animes.usecase';
import { AnimesRepository } from 'src/@core/domain/repositories/animes/animes.repository';
import { CategoriesRepository } from 'src/@core/domain/repositories/categories/categories.repository';
import { ClassificationsRepository } from 'src/@core/domain/repositories/classifications/classifications.repository';
import { TypesAnimesRepository } from 'src/@core/domain/repositories/type/types.repository';

@Module({
  controllers: [AnimesController],
  providers: [
    PrismaService,
    AnimesService,
    AnimesUseCase,
    AnimesRepository,
    CategoriesRepository,
    ClassificationsRepository,
    TypesAnimesRepository,
  ],
})
export class AnimesModule {}
