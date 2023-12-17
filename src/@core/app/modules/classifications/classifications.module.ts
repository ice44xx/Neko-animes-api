import { Module } from '@nestjs/common';
import { ClassificationsController } from '../../controller/classifications/classifications.controller';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { ClassificationsService } from '../../services/classifications/classifications.service';
import { ClassificationsRepository } from 'src/@core/domain/repositories/classifications/classifications.repository';
import { ClassificationsUseCase } from 'src/@core/domain/usecases/classifications/classifications.usecase';

@Module({
  controllers: [ClassificationsController],
  providers: [
    PrismaService,
    ClassificationsService,
    ClassificationsRepository,
    ClassificationsUseCase,
  ],
  exports: [ClassificationsService],
})
export class ClassificationsModule {}
