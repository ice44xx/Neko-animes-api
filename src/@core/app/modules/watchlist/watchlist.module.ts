import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/@core/domain/entities/users/users.entity';
import { Watchlist } from 'src/@core/domain/entities/watchlist/watchlist.entity';
import { WatchlistController } from '../../controller/watchlist/watchlist.controller';
import { WatchlistService } from '../../services/watchlist/watchlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Watchlist, Users])],
  controllers: [WatchlistController],
  providers: [WatchlistService],
  exports: [],
})
export class WatchlistModule {}
