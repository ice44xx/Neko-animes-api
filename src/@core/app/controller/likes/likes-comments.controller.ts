import {
  Controller,
  Delete,
  Get,
  HttpStatus,
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
import { LikesCommentsDto } from '../../dto/likes/create-likes-comments-dto';
import { LikesCommentsService } from '../../services/likes/likes-comments.service';

@ApiTags('Likes Comentários')
@Controller('likes-comments')
export class LikesCommentsController {
  constructor(private readonly likesCommentsService: LikesCommentsService) {}

  @Roles(UserType.User)
  @Get()
  async findAllLikesUser(@Request() req: AuthRequest, @Res() res) {
    try {
      const likesDto: LikesCommentsDto = { userId: req.user.id };
      const likes = await this.likesCommentsService.findAllLikesUser(likesDto);
      return res.status(HttpStatus.OK).json(likes);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao buscar os likes, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Post(':commentId')
  async create(@Request() req: AuthRequest, @Res() res, @Param('commentId') commentId: number) {
    try {
      const createLike: LikesCommentsDto = { userId: req.user.id, commentId: commentId };
      await this.likesCommentsService.create(createLike);
      return res.status(HttpStatus.CREATED).json({ message: 'Like adicionado ao comentário!' });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      } else if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao criar o like, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Delete(':commentId')
  async remove(@Request() req: AuthRequest, @Res() res, @Param('commentId') commentId: number) {
    try {
      const removeLike: LikesCommentsDto = { userId: req.user.id, commentId: commentId };
      await this.likesCommentsService.remove(removeLike);
      return res.status(HttpStatus.OK).json({ message: 'Like removido' });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      } else if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao remover o like, ' + error.message });
    }
  }
}
