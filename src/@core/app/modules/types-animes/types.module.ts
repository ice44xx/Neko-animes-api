import { Module } from '@nestjs/common';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { TypesAnimesService } from '../../services/types-animes/types.service';
import { TypesAnimesRepository } from 'src/@core/domain/repositories/types-animes/types.repository';
import { TypesAnimesUseCase } from 'src/@core/domain/usecases/types-animes/types.usecase';
import { TypesAnimesController } from '../../controller/types-animes/types.controller';

@Module({
  controllers: [TypesAnimesController],
  providers: [PrismaService, TypesAnimesService, TypesAnimesRepository, TypesAnimesUseCase],
})
export class TypesAnimesModule {}
