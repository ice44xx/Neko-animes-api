import { Module } from '@nestjs/common';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { TypesAnimesService } from '../../services/type/types.service';
import { TypesAnimesRepository } from 'src/@core/domain/repositories/type/types.repository';
import { TypesAnimesUseCase } from 'src/@core/domain/usecases/type/types.usecase';
import { TypesAnimesController } from '../../controller/type/types.controller';

@Module({
  controllers: [TypesAnimesController],
  providers: [PrismaService, TypesAnimesService, TypesAnimesRepository, TypesAnimesUseCase],
})
export class TypesAnimesModule {}
