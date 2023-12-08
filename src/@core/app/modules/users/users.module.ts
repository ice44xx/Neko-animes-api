import { Module } from '@nestjs/common';
import { UsersController } from '../../controller/users/users.controller';
import { UsersService } from '../../services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../domain/entities/users/users.entity';
import { Likes } from 'src/@core/domain/entities/likes/likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Likes])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
