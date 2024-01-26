import { Module } from '@nestjs/common';
import { CategoriesController } from '../../controller/categories/categories.controller';
import { CategoriesService } from '../../services/categories/categories.service';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { CategoriesRepository } from 'src/@core/domain/repositories/categories/categories.repository';
import { CategoriesUseCase } from 'src/@core/domain/usecases/categories/categories.usecase';

@Module({
  controllers: [CategoriesController],
  providers: [PrismaService, CategoriesService, CategoriesRepository, CategoriesUseCase],
})
export class CategoriesModule {}
