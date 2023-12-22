import { Module } from '@nestjs/common';
import { WatchlistController } from '../../controller/watchlist/watchlist.controller';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { WatchlistRepository } from 'src/@core/domain/repositories/watchlist/watchlist.repository';
import { WatchlistUseCase } from 'src/@core/domain/usecases/watchlist/watchlist.usecase';
import { WatchListService } from '../../services/watchlist/watchlist.service';
import { UsersRepository } from 'src/@core/domain/repositories/users/users.repository';

@Module({
  controllers: [WatchlistController],
  providers: [
    PrismaService,
    WatchlistRepository,
    WatchlistUseCase,
    WatchListService,
    UsersRepository,
  ],
})
export class WatchlistModule {}
