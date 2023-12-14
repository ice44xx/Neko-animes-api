import { Controller, Delete, Request, Param, Post, Res, Get } from '@nestjs/common';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
import { LikesAnimesService } from '../../services/likes/likes-animes.service';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Curtidas dos animes')
@Controller('likes-animes')
export class LikesAnimesController {
  constructor(private readonly likesService: LikesAnimesService) {}

  @Public()
  @Get()
  async getTopAnimes(@Res() res) {
    try {
      const animes = await this.likesService.getTopLikedAnimes();
      return res.status(201).send(animes);
    } catch (error) {
      return res.status(500).send({ message: 'Erro ao buscar os top 10 animes' });
    }
  }

  @Post(':id')
  async create(@Request() req: AuthRequest, @Res() res, @Param('id') id: number) {
    try {
      const currentUser = req.user;

      await this.likesService.createLike(currentUser.id, id);
      return res.status(201).send({ message: 'Like adicionado com sucesso!' });
    } catch (error) {
      return res.status(500).send({ message: 'Erro ao adicionar o like' });
    }
  }

  @Delete(':id')
  async remove(@Request() req: AuthRequest, @Res() res, @Param('id') id: number) {
    try {
      const currentUser = req.user;

      await this.likesService.deleteLike(currentUser.id, id);
      return res.status(201).send({ message: 'Like removido com sucesso!' });
    } catch (error) {
      return res.status(500).send({ message: 'Erro ao remover o like' });
    }
  }
}
