import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesEpisodes } from 'src/@core/domain/entities/likes-episodes/likes-episodes.entity';
import { LikesEpisodesController } from '../../controller/likes/likes-episodes.controller';
import { LikesEpisodesService } from '../../services/likes/likes-episodes.service';
import { Episodes } from 'src/@core/domain/entities/episodes/episodes.entity';
import { Users } from 'src/@core/domain/entities/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikesEpisodes, Episodes, Users])],
  controllers: [LikesEpisodesController],
  providers: [LikesEpisodesService],
})
export class LikesEpisodesModule {}
