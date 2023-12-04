import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episodes } from '../../../domain/entities/episodes/episodes.entity';
import { EpisodesController } from '../../controller/episodes/episodes.controller';
import { EpisodesService } from '../../services/episodes/episodes.service';
import { Seasons } from '../../../domain/entities/seasons/seasons.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Episodes, Seasons])],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}
