import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { WatchlistService } from '../../services/watchlist/watchlist.service';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
import { CreateWatchListDto } from '../../dto/requests/watchlist/create-watchlist.dto';
import { Roles, UserType } from 'src/@core/common/decorators/roles.decorator';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Roles(UserType.User)
  @Get()
  async findAll(@Request() req: AuthRequest, @Res() res) {
    try {
      const currentUser = req.user.id;
      const watchlist = await this.watchlistService.findAll(currentUser);

      if (watchlist.length === 0) {
        return res.status(404).json({ message: 'Watchlist vazia para o usuário' });
      }

      return res.status(200).json(watchlist);
    } catch (error) {
      throw new NotFoundException('Ocorreu algum erro ao encontrar a listagem');
    }
  }

  @Roles(UserType.User)
  @Post()
  async create(
    @Request() req: AuthRequest,
    @Res() res,
    @Body() createWatchListDto: CreateWatchListDto,
  ) {
    try {
      const currentUser = req.user.id;
      const watchlist = await this.watchlistService.create(
        currentUser,
        createWatchListDto,
      );
      return res.status(201).json(watchlist);
    } catch (error) {
      throw new NotFoundException('Ocorreu algum erro ao criar a listagem');
    }
  }

  @Roles(UserType.User)
  @HttpCode(204)
  @Delete(':watchlistId')
  async delete(@Param('watchlistId') watchlistId: number, @Request() req: AuthRequest) {
    try {
      const currentUser = req.user.id;
      return await this.watchlistService.delete(currentUser, watchlistId);
    } catch (error) {
      throw new NotFoundException('Ocorreu algum erro ao deletar a listagem');
    }
  }
}
