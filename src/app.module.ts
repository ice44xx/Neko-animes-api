import { Module } from '@nestjs/common';
import { UsersModule } from './@core/app/modules/users/users.module';
import { CategoryModule } from './@core/app/modules/categories/category.module';
import { AnimeModule } from './@core/app/modules/animes/animes.module';
import { SeasonsModule } from './@core/app/modules/seasons/seasons.module';
import { EpisodesModule } from './@core/app/modules/episodes/episodes.module';
import { DatabaseModule } from './@core/infra/database/database.module';

@Module({
  imports: [
    EpisodesModule,
    SeasonsModule,
    AnimeModule,
    CategoryModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
