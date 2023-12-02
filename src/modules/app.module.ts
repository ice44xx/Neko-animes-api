import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from '../database/database.module';
import { CategoryModule } from './categories/category.module';
import { AnimeModule } from './animes/animes.module';
import { SeasonsModule } from './seasons/seasons.module';
import { EpisodesModule } from './episodes/episodes.module';

@Module({
  imports: [
    EpisodesModule,
    SeasonsModule,
    AnimeModule,
    CategoryModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
