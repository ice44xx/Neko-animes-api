import { Module } from '@nestjs/common';
import { UsersModule } from './@core/app/modules/users/users.module';
import { CategoryModule } from './@core/app/modules/categories/category.module';
import { AnimeModule } from './@core/app/modules/animes/animes.module';
import { SeasonsModule } from './@core/app/modules/seasons/seasons.module';
import { EpisodesModule } from './@core/app/modules/episodes/episodes.module';
import { DatabaseModule } from './@core/infra/database/database.module';
import { AuthModule } from './@core/app/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './@core/infra/auth/guards/jwt-auth.guard';
import { BackgroundsModule } from './@core/app/modules/backgrounds/backgrounds.module';
import { LikesModule } from './@core/app/modules/likes/likes.module';

@Module({
  imports: [
    AuthModule,
    BackgroundsModule,
    LikesModule,
    EpisodesModule,
    SeasonsModule,
    AnimeModule,
    CategoryModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
