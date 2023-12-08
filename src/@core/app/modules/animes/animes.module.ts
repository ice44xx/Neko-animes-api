import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animes } from '../../../domain/entities/animes/animes.entity';
import { AnimesController } from '../../controller/animes/animes.controller';
import { AnimesService } from '../../services/animes/animes.service';
import { Categories } from '../../../domain/entities/categories/categories.entity';
import { Seasons } from 'src/@core/domain/entities/seasons/seasons.entity';
import { LikesAnimes } from 'src/@core/domain/entities/likes-animes/likes-animes.entity';
import { Favorites } from 'src/@core/domain/entities/favorites/favorites.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Animes, Categories, Seasons, LikesAnimes, Favorites]),
  ],
  controllers: [AnimesController],
  providers: [AnimesService],
})
export class AnimeModule {}
