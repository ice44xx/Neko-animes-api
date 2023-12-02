import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episodes } from './entities/episodes.entity';
import { EpisodesController } from './controller/episodes.controller';
import { EpisodesService } from './services/episodes.service';
import { Seasons } from '../seasons/entities/seasons.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Episodes, Seasons])],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}
