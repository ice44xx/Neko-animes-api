import { Injectable } from '@nestjs/common';
import { WatchlistUseCase } from 'src/@core/domain/usecases/watchlist/watchlist.usecase';

@Injectable()
export class WatchListService {
  constructor(private readonly watchlistUseCase: WatchlistUseCase) {}

  async findLastTen() {}

  async create() {}

  async remove() {}
}
