import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seasons } from '../../../domain/entities/seasons/seasons.entity';
import { SeasonsController } from '../../controller/seasons/seasons.controller';
import { SeasonsService } from '../../services/seasons/seasons.service';
import { Animes } from 'src/@core/domain/entities/animes/animes.entity';
import { Episodes } from 'src/@core/domain/entities/episodes/episodes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seasons, Animes, Episodes])],
  controllers: [SeasonsController],
  providers: [SeasonsService],
})
export class SeasonsModule {}
