import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animes } from './entities/animes.entity';
import { AnimesController } from './controllers/animes.controller';
import { AnimesService } from './services/animes.service';
import { Categories } from '../categories/entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animes, Categories])],
  controllers: [AnimesController],
  providers: [AnimesService],
})
export class AnimeModule {}
