import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { WatchlistRepository } from '../../repositories/watchlist/watchlist.repository';
import { UsersRepository } from '../../repositories/users/users.repository';
import { CreateWatchListDto } from 'src/@core/app/dto/watchlist/create-watchlist.dto';
import { WatchListDto } from 'src/@core/app/dto/watchlist/watchlist-dto';

@Injectable()
export class WatchlistUseCase {
  constructor(
    private readonly watchlistRepository: WatchlistRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async findLastTen({ userId }: WatchListDto) {
    return await this.watchlistRepository.findLastTen(userId);
  }

  async create(userId: number, createWatchListDto: CreateWatchListDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const newWatchlist = await this.watchlistRepository.create({
      ...createWatchListDto,
      user: { connect: { id: userId } },
    });

    return newWatchlist;
  }

  async remove({ userId, id }: WatchListDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const watchlist = await this.watchlistRepository.findByOne(userId, id);

    if (!watchlist) {
      throw new NotFoundException(`Lista ${id} não encontrado`);
    }

    return await this.watchlistRepository.remove(id);
  }
}
