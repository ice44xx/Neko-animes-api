import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seasons } from '../../../domain/entities/seasons/seasons.entity';
import { SeasonsController } from '../../controller/seasons/seasons.controller';
import { SeasonsService } from '../../services/seasons/seasons.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seasons])],
  controllers: [SeasonsController],
  providers: [SeasonsService],
})
export class SeasonsModule {}
