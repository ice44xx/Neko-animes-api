import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/@core/domain/entities/users/users.entity';
import { Watchlist } from 'src/@core/domain/entities/watchlist/watchlist.entity';
import { Repository } from 'typeorm';
import { CreateWatchListDto } from '../../dto/requests/watchlist/create-watchlist.dto';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(Watchlist)
    private readonly watchlistRepository: Repository<Watchlist>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findAll(userId: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const watchlist = await this.watchlistRepository.find({
        where: { users: { id: userId } },
        order: {
          createdAt: 'DESC',
        },
        take: 10,
      });

      return watchlist;
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar a watchlist, ' + error.message);
    }
  }

  async create(userId: number, createWatchlistDto: CreateWatchListDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const watchlist = this.watchlistRepository.create(createWatchlistDto);

      watchlist.users = user;

      const save = await this.watchlistRepository.save(watchlist);
      return save;
    } catch (error) {
      throw new Error(
        'Ocorreu um erro ao criar a listagem de episódios, ' + error.message,
      );
    }
  }

  async delete(userId: number, watchlistId: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
        relations: ['watchlist'],
      });

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const watchlist = user.watchlist.find((item) => item.id === watchlistId);

      return await this.watchlistRepository.remove(watchlist);
    } catch (error) {
      throw new Error('Ocorreu um erro ao deletar a watchlist, ' + error.message);
    }
  }
}
