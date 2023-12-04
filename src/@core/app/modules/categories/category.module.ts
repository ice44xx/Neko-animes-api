import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from '../../../domain/entities/categories/categories.entity';
import { CategoriesController } from '../../controller/categories/categories.controller';
import { CategoriesService } from '../../services/categories/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoryModule {}
