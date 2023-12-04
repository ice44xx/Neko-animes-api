import { Module } from '@nestjs/common';
import { UsersController } from '../../controller/users/users.controller';
import { UsersService } from '../../services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../domain/entities/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
