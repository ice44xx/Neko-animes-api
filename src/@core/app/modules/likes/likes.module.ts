import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from 'src/@core/domain/entities/likes/likes.entity';
import { LikesController } from '../../controller/likes/likes.controller';
import { LikesService } from '../../services/likes-episodes/likes.service';
import { Episodes } from 'src/@core/domain/entities/episodes/episodes.entity';
import { Users } from 'src/@core/domain/entities/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Likes, Episodes, Users])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
