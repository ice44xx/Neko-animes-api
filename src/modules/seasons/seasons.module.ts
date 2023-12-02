import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seasons } from './entities/seasons.entity';
import { SeasonsController } from './controller/seasons.controller';
import { SeasonsService } from './services/seasons.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seasons])],
  controllers: [SeasonsController],
  providers: [SeasonsService],
})
export class SeasonsModule {}
