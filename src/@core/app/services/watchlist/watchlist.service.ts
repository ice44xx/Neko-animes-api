import { Injectable } from '@nestjs/common';
import { WatchlistUseCase } from 'src/@core/domain/usecases/watchlist/watchlist.usecase';
import { CreateWatchListDto } from '../../dto/watchlist/create-watchlist.dto';
import { WatchListDto } from '../../dto/watchlist/watchlist-dto';

@Injectable()
export class WatchListService {
  constructor(private readonly watchlistUseCase: WatchlistUseCase) {}

  async findLastTen(userId: number) {
    return await this.watchlistUseCase.findLastTen({ userId });
  }

  async create(userId: number, createWatchListDto: CreateWatchListDto) {
    return await this.watchlistUseCase.create(userId, createWatchListDto);
  }

  async remove({ userId, id }: WatchListDto) {
    return await this.watchlistUseCase.remove({ userId, id });
  }
}
