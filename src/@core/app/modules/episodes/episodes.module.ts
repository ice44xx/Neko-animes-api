import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episodes } from '../../../domain/entities/episodes/episodes.entity';
import { EpisodesController } from '../../controller/episodes/episodes.controller';
import { EpisodesService } from '../../services/episodes/episodes.service';
import { Seasons } from '../../../domain/entities/seasons/seasons.entity';
import { LikesEpisodes } from 'src/@core/domain/entities/likes-episodes/likes-episodes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Episodes, Seasons, LikesEpisodes])],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}
