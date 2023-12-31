import {
  Controller,
  Delete,
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
import { LikesAnimesDto } from '../../dto/likes/create-likes-animes-dto';

@ApiTags('Likes Animes')
@Controller('likes-animes')
export class LikesAnimesController {
  constructor(private readonly likesAnimesService: LikesAnimesService) {}

  @Roles(UserType.User)
  @Post(':animeId')
  async create(@Request() req: AuthRequest, @Res() res, @Param('animeId') animeId: number) {
    try {
      const createLike: LikesAnimesDto = { userId: req.user.id, animeId: animeId };
      const like = await this.likesAnimesService.create(createLike);
      return res.status(201).send({ message: 'Like adicionado ao anime!', like });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(401).send({ message: error.message });
      } else if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res.status(500).send({ message: 'Ocorreu um erro ao criar o like, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Delete(':animeId')
  async remove(@Request() req: AuthRequest, @Res() res, @Param('animeId') animeId: number) {
    try {
      const removeLike: LikesAnimesDto = { userId: req.user.id, animeId: animeId };
      await this.likesAnimesService.remove(removeLike);
      return res.status(200).send({ message: 'Like removido' });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(401).send({ message: error.message });
      } else if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao remover o like, ' + error.message });
    }
  }
}
