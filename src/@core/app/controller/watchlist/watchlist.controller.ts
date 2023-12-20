import { Controller, Delete, Get, Post } from '@nestjs/common';
import { WatchListService } from '../../services/watchlist/watchlist.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Lista de Assistidos')
@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchListService) {}

  @Get()
  async findLastTen() {
    try {
    } catch (error) {}
  }

  @Post()
  async create() {
    try {
    } catch (error) {}
  }

  @Delete()
  async remove() {
    try {
    } catch (error) {}
  }
}
