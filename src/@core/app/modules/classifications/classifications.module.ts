import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classifications } from 'src/@core/domain/entities/classifications/classifications.entity';
import { ClassificationsController } from '../../controller/classifications/classifications.controller';
import { ClassificationsService } from '../../services/classifications/classifications.service';
import { Animes } from 'src/@core/domain/entities/animes/animes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classifications, Animes])],
  controllers: [ClassificationsController],
  providers: [ClassificationsService],
})
export class ClassificationsModule {}
