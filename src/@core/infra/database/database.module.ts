import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AnimesModule } from 'src/@core/app/modules/animes/animes.module';
import { AuthModule } from 'src/@core/app/modules/auth/auth.module';
import { BackgroundsModule } from 'src/@core/app/modules/backgrounds/backgrounds.module';
import { CategoriesModule } from 'src/@core/app/modules/categories/category.module';
import { ClassificationsModule } from 'src/@core/app/modules/classifications/classifications.module';
import { CommentsModule } from 'src/@core/app/modules/comments/comments.module';
import { EpisodesModule } from 'src/@core/app/modules/episodes/episodes.module';
import { FavoritesModule } from 'src/@core/app/modules/favorites/favorites.module';
import { LikesAnimesModule } from 'src/@core/app/modules/likes/likes-animes.module';
import { LikesCommentsModule } from 'src/@core/app/modules/likes/likes-comments.module';
import { LikesEpisodesModule } from 'src/@core/app/modules/likes/likes-episodes.module';
import { SeasonsModule } from 'src/@core/app/modules/seasons/seasons.module';
import { RolesModule } from 'src/@core/app/modules/users/roles.module';
import { UsersModule } from 'src/@core/app/modules/users/users.module';
import { WatchlistModule } from 'src/@core/app/modules/watchlist/watchlist.module';

@Module({
  imports: [
    AnimesModule,
    AuthModule,
    BackgroundsModule,
    CategoriesModule,
    ClassificationsModule,
    CommentsModule,
    EpisodesModule,
    FavoritesModule,
    LikesAnimesModule,
    LikesCommentsModule,
    LikesEpisodesModule,
    SeasonsModule,
    RolesModule,
    UsersModule,
    WatchlistModule,
  ],
  providers: [PrismaService],
})
export class DatabaseModule {}
