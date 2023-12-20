import { Injectable } from '@nestjs/common';
import { WatchlistRepository } from '../../repositories/watchlist/watchlist.repository';
import { UsersRepository } from '../../repositories/users/users.repository';

@Injectable()
export class WatchlistUseCase {
  constructor(
    private readonly watchlistRepository: WatchlistRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async findLastTen() {}

  async create() {}

  async remove() {}
}
