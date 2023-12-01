import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animes } from './entities/animes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animes])],
  controllers: [],
  providers: [],
})
export class AnimeModule {}
