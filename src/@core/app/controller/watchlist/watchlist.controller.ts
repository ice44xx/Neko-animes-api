import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { WatchListService } from '../../services/watchlist/watchlist.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
import { CreateWatchListDto } from '../../dto/watchlist/create-watchlist.dto';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';

@ApiTags('Lista de Assistidos')
@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchListService) {}

  @Roles(UserType.User)
  @Get()
  async findLastTen(@Request() req: AuthRequest, @Res() res) {
    try {
      const currentUser = req.user.id;
      const watchlist = await this.watchlistService.findLastTen(currentUser);

      return res.status(200).json(watchlist);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(401).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao buscar a lista, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Post('create')
  async create(
    @Request() req: AuthRequest,
    @Res() res,
    @Body() createWatchlistDto: CreateWatchListDto,
  ) {
    try {
      const currentUser = req.user.id;
      const watchlist = await this.watchlistService.create(currentUser, createWatchlistDto);

      return res.status(201).json(watchlist);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(401).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao criar a lista, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Delete(':id')
  async remove(@Request() req: AuthRequest, @Res() res, @Param('id') id: number) {
    try {
      const currentUser = req.user.id;
      await this.watchlistService.remove({ userId: currentUser, id });

      return res.status(200).send({ message: 'Lista removida!' });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(401).send({ message: error.message });
      } else if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao remover a lista, ' + error.message });
    }
  }
}
