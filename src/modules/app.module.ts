import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from '../database/database.module';
import { CategoryModule } from './categories/category.module';
import { AnimeModule } from './animes/animes.module';

@Module({
  imports: [AnimeModule, CategoryModule, UsersModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
