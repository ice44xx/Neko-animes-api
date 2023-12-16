import { Module } from '@nestjs/common';
import { RolesController } from '../../controller/users/roles.controller';
import { RolesService } from '../../services/users/roles.service';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { RolesRepository } from 'src/@core/infra/database/repositories/users/roles.repository';

@Module({
  controllers: [RolesController],
  providers: [PrismaService, RolesService, RolesRepository],
  exports: [RolesService],
})
export class RolesModule {}
