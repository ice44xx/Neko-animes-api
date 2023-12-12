import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/@core/domain/entities/users/users.entity';
import { Comments } from 'src/@core/domain/entities/comments/comments.entity';
import { LikesComments } from 'src/@core/domain/entities/likes-comments/likes-comments';
import { LikesCommentsController } from '../../controller/likes/likes-comments.controller';
import { LikesCommentsService } from '../../services/likes/likes-comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([LikesComments, Users, Comments])],
  controllers: [LikesCommentsController],
  providers: [LikesCommentsService],
})
export class LikesCommentsModule {}
