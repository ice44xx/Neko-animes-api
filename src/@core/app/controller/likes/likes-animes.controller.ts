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
import { ApiTags } from '@nestjs/swagger';
import { LikesAnimesService } from '../../services/likes/likes-animes.service';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { LikesAnimesDto } from '../../dto/likes/create-likes-dto';

@ApiTags('Likes animes')
@Controller('likes-animes')
export class LikesAnimesController {
  constructor(private readonly likesAnimesService: LikesAnimesService) {}

  @Public()
  @Get()
  async getTop10Likeds(@Res() res) {
    try {
      const animes = await this.likesAnimesService.getTop10Likeds();
      return res.status(200).json(animes);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao buscar o top 10 animes curtidos' });
    }
  }

  @Roles(UserType.User)
  @Post(':animeId')
  async create(@Request() req: AuthRequest, @Res() res, @Param('animeId') animeId: number) {
    try {
      const createLike: LikesAnimesDto = { userId: req.user.id, animeId: animeId };
      await this.likesAnimesService.create(createLike);
      return res.status(201).send({ message: 'Like adicionado ao anime!' });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(401).send({ message: error.message });
      } else if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      } else if (error instanceof ConflictException) {
        return res.status(409).send({ message: error.message });
      }
      return res.status(500).send({ message: 'Ocorreu um erro ao criar o like' });
    }
  }

  @Roles(UserType.User)
  @Delete(':animeId')
  async remove(@Request() req: AuthRequest, @Res() res, @Param('animeId') animeId: number) {
    try {
      const removeLike: LikesAnimesDto = { userId: req.user.id, animeId: animeId };
      await this.likesAnimesService.remove(removeLike);
      return res.status(201).send({ message: 'Like removido' });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(401).send({ message: error.message });
      } else if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res.status(500).send({ message: 'Ocorreu um erro ao criar o like' });
    }
  }
}
