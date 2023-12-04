import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animes } from '../../../domain/entities/animes/animes.entity';
import { AnimesController } from '../../controller/animes/animes.controller';
import { AnimesService } from '../../services/animes/animes.service';
import { Categories } from '../../../domain/entities/categories/categories.entity';
import { Seasons } from 'src/@core/domain/entities/seasons/seasons.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animes, Categories, Seasons])],
  controllers: [AnimesController],
  providers: [AnimesService],
})
export class AnimeModule {}
