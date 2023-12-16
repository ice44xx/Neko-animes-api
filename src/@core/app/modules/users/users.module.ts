import { Module } from '@nestjs/common';
import { UsersController } from '../../controller/users/users.controller';
import { UsersService } from '../../services/users/users.service';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { UsersRepository } from 'src/@core/infra/database/repositories/users/users.repository';
import { RolesRepository } from 'src/@core/infra/database/repositories/users/roles.repository';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService, UsersRepository, RolesRepository],
  exports: [UsersService],
})
export class UsersModule {}
