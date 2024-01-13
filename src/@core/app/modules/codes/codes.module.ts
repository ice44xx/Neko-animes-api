import { Module } from '@nestjs/common';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { CodesServices } from '../../services/codes/codes.service';
import { CodesRepository } from 'src/@core/domain/repositories/codes/codes.repository';
import { CodesController } from '../../controller/codes/codes.controller';
import { CodesUseCase } from 'src/@core/domain/usecases/codes/codes.usecase';
import { EmailModule } from '../forget-password/forget-password.module';
import { EmailUseCase } from '../../services/codes/email.service';

@Module({
  imports: [EmailModule],
  controllers: [CodesController],
  providers: [PrismaService, EmailUseCase, CodesServices, CodesRepository, CodesUseCase],
})
export class CodesModule {}
