import { Module } from '@nestjs/common';
import { UsersController } from '../../controller/users/users.controller';
import { UsersService } from '../../services/users/users.service';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { UsersRepository } from 'src/@core/domain/repositories/users/users.repository';
import { RolesRepository } from 'src/@core/domain/repositories/users/roles.repository';
import { UsersUseCase } from 'src/@core/domain/usecases/users/users.usecase';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService, UsersRepository, UsersUseCase, RolesRepository],
  exports: [UsersService],
})
export class UsersModule {}
