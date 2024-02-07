import { Module } from '@nestjs/common';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { ErrorsRepository } from 'src/@core/domain/repositories/errors/errors.repository';
import { ErrorsUseCase } from 'src/@core/domain/usecases/errors/errors.usecase';
import { ErrorsServices } from '../../services/errors/errors.service';
import { ErrorsController } from '../../controller/errors/errors.controle';

@Module({
  imports: [],
  controllers: [ErrorsController],
  providers: [PrismaService, ErrorsRepository, ErrorsUseCase, ErrorsServices],
})
export class ErrorsModule {}
