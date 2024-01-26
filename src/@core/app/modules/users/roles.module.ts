import { Module } from '@nestjs/common';
import { RolesController } from '../../controller/users/roles.controller';
import { RolesService } from '../../services/users/roles.service';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { RolesRepository } from 'src/@core/domain/repositories/users/roles.repository';
import { RolesUseCase } from 'src/@core/domain/usecases/users/roles.usecase';

@Module({
  controllers: [RolesController],
  providers: [PrismaService, RolesService, RolesUseCase, RolesRepository],
})
export class RolesModule {}
