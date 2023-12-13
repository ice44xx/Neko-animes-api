import { Module } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/@core/domain/entities/users/users.entity';
import { Categories } from 'src/@core/domain/entities/categories/categories.entity';
import { Animes } from 'src/@core/domain/entities/animes/animes.entity';
import { Seasons } from 'src/@core/domain/entities/seasons/seasons.entity';
import { Episodes } from 'src/@core/domain/entities/episodes/episodes.entity';
import { Backgrounds } from 'src/@core/domain/entities/backgrounds/backgrounds.entity';
import { LikesEpisodes } from 'src/@core/domain/entities/likes-episodes/likes-episodes.entity';
import { LikesAnimes } from 'src/@core/domain/entities/likes-animes/likes-animes.entity';
import { Favorites } from 'src/@core/domain/entities/favorites/favorites.entity';
import { Classifications } from 'src/@core/domain/entities/classifications/classifications.entity';
import { Comments } from 'src/@core/domain/entities/comments/comments.entity';
import { LikesComments } from 'src/@core/domain/entities/likes-comments/likes-comments';
import { Roles } from 'src/@core/domain/entities/users/roles.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '020619',
  database: 'nekoanimes',
  entities: [
    Roles,
    Users,
    Backgrounds,
    Classifications,
    Categories,
    Animes,
    Favorites,
    LikesAnimes,
    LikesEpisodes,
    LikesComments,
    Seasons,
    Episodes,
    Comments,
  ],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
  exports: [],
})
export class DatabaseModule {}
