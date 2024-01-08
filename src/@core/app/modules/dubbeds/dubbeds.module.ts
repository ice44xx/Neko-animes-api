import { Module } from '@nestjs/common';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { DubbedsController } from '../../controller/dubbeds/dubbeds.controller';
import { DubbedsRepository } from 'src/@core/domain/repositories/dubbeds/dubbeds.repository';
import { DubbedsService } from '../../services/dubbeds/dubbeds.service';
import { DubbedsUseCase } from 'src/@core/domain/usecases/dubbeds/dubbeds.usecase';

@Module({
  controllers: [DubbedsController],
  providers: [PrismaService, DubbedsRepository, DubbedsService, DubbedsUseCase],
})
export class DubbedsModule {}
