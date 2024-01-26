import { Module } from '@nestjs/common';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { CodesServices } from '../../services/codes/codes.service';
import { CodesRepository } from 'src/@core/domain/repositories/codes/codes.repository';
import { CodesController } from '../../controller/codes/codes.controller';
import { CodesUseCase } from 'src/@core/domain/usecases/codes/codes.usecase';
import { EmailModule } from '../mailer/email.module';
import { EmailUseCase } from '../../services/codes/email.service';
import { UsersRepository } from 'src/@core/domain/repositories/users/users.repository';

@Module({
  imports: [EmailModule],
  controllers: [CodesController],
  providers: [PrismaService, EmailUseCase, CodesServices, CodesRepository, CodesUseCase, UsersRepository],
})
export class CodesModule {}
