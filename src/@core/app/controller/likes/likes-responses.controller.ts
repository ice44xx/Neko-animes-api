import { Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Request, Res, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { LikesResponsesCommentsDto } from '../../dto/likes/create-likes-responses-dto';
import { LikesResponsesCommentsService } from '../../services/likes/likes-responses.service';

@ApiTags('Likes de Respostas de comentários')
@Controller('likes-responses-comments')
export class LikesResponsesCommentsController {
  constructor(private readonly likesResponsesCommentsService: LikesResponsesCommentsService) {}

  @Roles(UserType.User)
  @Get()
  async findAllLikesUser(@Request() req: AuthRequest, @Res() res) {
    try {
      const likesDto: LikesResponsesCommentsDto = { userId: req.user.id };
      const likes = await this.likesResponsesCommentsService.findAllLikesUser(likesDto);
      return res.status(HttpStatus.OK).send(likes);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).send({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro ao buscar os likes, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Post(':commentId')
  async create(@Request() req: AuthRequest, @Res() res, @Param('commentId') commentId: number) {
    try {
      const createLike: LikesResponsesCommentsDto = { userId: req.user.id, commentId: commentId };
      await this.likesResponsesCommentsService.create(createLike);
      return res.status(HttpStatus.CREATED).send({ message: 'Like adicionado ao comentário!' });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).send({ message: error.message });
      } else if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro ao criar o like, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Delete(':commentId')
  async remove(@Request() req: AuthRequest, @Res() res, @Param('commentId') commentId: number) {
    try {
      const removeLike: LikesResponsesCommentsDto = { userId: req.user.id, commentId: commentId };
      await this.likesResponsesCommentsService.remove(removeLike);
      return res.status(HttpStatus.OK).send({ message: 'Like removido' });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).send({ message: error.message });
      } else if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro ao remover o like, ' + error.message });
    }
  }
}
