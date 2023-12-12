import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../domain/entities/users/users.entity';
import { Roles } from 'src/@core/domain/entities/users/roles.entity';
import { RolesController } from '../../controller/users/roles.controller';
import { RolesService } from '../../services/users/roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Roles, Users])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [],
})
export class RolesModule {}
