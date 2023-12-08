import { Controller, Delete, Request, Param, Post, Res } from '@nestjs/common';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
import { LikesAnimesService } from '../../services/likes/likes-animes.service';

@Controller('likes-animes')
export class LikesAnimesController {
  constructor(private readonly likesService: LikesAnimesService) {}

  @Post(':id')
  async create(@Request() req: AuthRequest, @Res() res, @Param('id') id: number) {
    const currentUser = req.user;

    await this.likesService.createLike(currentUser.id, id);
    return res.status(201).send({ message: 'Like adicionado com sucesso!' });
  }

  @Delete(':id')
  async remove(@Request() req: AuthRequest, @Res() res, @Param('id') id: number) {
    const currentUser = req.user;

    await this.likesService.deleteLike(currentUser.id, id);
    return res.status(201).send({ message: 'Like removido com sucesso!' });
  }
}
