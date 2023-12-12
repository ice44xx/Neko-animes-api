import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from 'src/@core/domain/entities/comments/comments.entity';
import { Episodes } from 'src/@core/domain/entities/episodes/episodes.entity';
import { Users } from 'src/@core/domain/entities/users/users.entity';
import { CommentsController } from '../../controller/comments/comments.controller';
import { CommentsService } from '../../services/comments/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comments, Users, Episodes])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
