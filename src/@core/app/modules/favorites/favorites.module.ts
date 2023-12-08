import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from 'src/@core/domain/entities/favorites/favorites.entity';
import { FavoritesController } from '../../controller/favorites/favorites.controller';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { Animes } from 'src/@core/domain/entities/animes/animes.entity';
import { Users } from 'src/@core/domain/entities/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorites, Animes, Users])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
