import {
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
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { LikesEpisodesService } from '../../services/likes/likes-episodes.service';
import { LikesEpisodesDto } from '../../dto/likes/create-likes-episodes-dto';

@ApiTags('Likes Episódios')
@Controller('likes-episodes')
export class LikesEpisodesController {
  constructor(private readonly likesEpisodesService: LikesEpisodesService) {}

  @Roles(UserType.User)
  @Get()
  async findAllLikesUser(@Request() req: AuthRequest, @Res() res) {
    try {
      const likesDto: LikesEpisodesDto = { userId: req.user.id };
      const likes = await this.likesEpisodesService.findAllLikesUser(likesDto);
      return res.status(200).json(likes);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(401).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao buscar os likes, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Post(':episodeId')
  async create(@Request() req: AuthRequest, @Res() res, @Param('episodeId') episodeId: number) {
    try {
      const createLike: LikesEpisodesDto = { userId: req.user.id, episodeId: episodeId };
      const like = await this.likesEpisodesService.create(createLike);
      return res.status(201).send({ message: 'Like adicionado ao episódio!', like });
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
  @Delete(':episodeId')
  async remove(@Request() req: AuthRequest, @Res() res, @Param('episodeId') episodeId: number) {
    try {
      const removeLike: LikesEpisodesDto = { userId: req.user.id, episodeId: episodeId };
      await this.likesEpisodesService.remove(removeLike);
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
