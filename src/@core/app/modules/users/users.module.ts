import { Module } from '@nestjs/common';
import { UsersController } from '../../controller/users/users.controller';
import { UsersService } from '../../services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../domain/entities/users/users.entity';
import { LikesEpisodes } from 'src/@core/domain/entities/likes-episodes/likes-episodes.entity';
import { Favorites } from 'src/@core/domain/entities/favorites/favorites.entity';
import { Roles } from 'src/@core/domain/entities/users/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles, LikesEpisodes, Favorites])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
