import {
  ConflictException,
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
import { FavoritesService } from '../../services/favorites/favorites.service';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
import { CreateFavoritesDto } from '../../dto/favorites/create-favorites-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favoritos')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Roles(UserType.User)
  @Get()
  async findAllFavoritesUser(@Request() req: AuthRequest, @Res() res) {
    try {
      const favoritesDto: CreateFavoritesDto = { userId: req.user.id };
      const favorites = await this.favoritesService.findAllFavoritesUser(favoritesDto);
      return res.status(200).json(favorites);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(401).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao buscar os favoritos, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Post(':animeId')
  async create(@Request() req: AuthRequest, @Res() res, @Param('animeId') animeId: number) {
    const currentUser = req.user;
    const favoritesDto: CreateFavoritesDto = { userId: currentUser.id, animeId: animeId };
    try {
      const favorites = await this.favoritesService.create(favoritesDto);
      return res.status(201).json(favorites);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(401).send({ message: error.message });
      } else if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      } else if (error instanceof ConflictException) {
        return res.status(409).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao criar o favorito, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Delete(':animeId')
  async remove(@Request() req: AuthRequest, @Res() res, @Param('animeId') animeId: number) {
    const currentUser = req.user;
    const favoritesDto: CreateFavoritesDto = { userId: currentUser.id, animeId: animeId };
    try {
      await this.favoritesService.remove(favoritesDto);
      return res.status(200).json({ message: 'Like removido com sucesso!' });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(401).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao remover dos favoritos, ' + error.message });
    }
  }
}
