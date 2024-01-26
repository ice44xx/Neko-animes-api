import { Module } from '@nestjs/common';
import { BackgroundsController } from '../../controller/backgrounds/backgrounds.controller';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { BackgroundsRepository } from 'src/@core/domain/repositories/backgrounds/backgrounds.repository';
import { BackgroundsUseCase } from 'src/@core/domain/usecases/backgrounds/backgrounds.usecase';
import { BackgroundsService } from '../../services/backgrounds/backgrounds.service';

@Module({
  controllers: [BackgroundsController],
  providers: [PrismaService, BackgroundsRepository, BackgroundsUseCase, BackgroundsService],
})
export class BackgroundsModule {}
