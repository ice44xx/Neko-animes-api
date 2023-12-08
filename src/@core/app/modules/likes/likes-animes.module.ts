import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesAnimesController } from '../../controller/likes/likes-animes.controller';
import { LikesAnimesService } from '../../services/likes/likes-animes.service';
import { LikesAnimes } from 'src/@core/domain/entities/likes-animes/likes-animes.entity';
import { Users } from 'src/@core/domain/entities/users/users.entity';
import { Animes } from 'src/@core/domain/entities/animes/animes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikesAnimes, Users, Animes])],
  controllers: [LikesAnimesController],
  providers: [LikesAnimesService],
})
export class LikesAnimeModule {}
