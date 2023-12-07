import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Backgrounds } from 'src/@core/domain/entities/backgrounds/backgrounds.entity';
import { BackgroundsController } from '../../controller/backgrounds/backgrounds.controller';
import { BackgroundsService } from '../../services/backgrounds/backgrounds.service';

@Module({
  imports: [TypeOrmModule.forFeature([Backgrounds])],
  controllers: [BackgroundsController],
  providers: [BackgroundsService],
})
export class BackgroundsModule {}
