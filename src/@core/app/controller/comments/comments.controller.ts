import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentsService } from '../../services/comments/comments.service';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
import { CreateCommentsDto } from '../../dto/comments/create-comments-dto';
import { UpdateCommentsDto } from '../../dto/comments/update-comments-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comentários')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Roles(UserType.Admin)
  @Get()
  async findAll(@Res() res) {
    try {
      const comments = await this.commentsService.findAll();
      return res.status(HttpStatus.OK).json(comments);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao buscar os comentários, ' + error.message });
    }
  }

  @Public()
  @Get('episode/:episodeId')
  async findAllByEpisode(@Res() res, @Param('episodeId') episodeId: number) {
    try {
      const comments = await this.commentsService.findAllByEpisode(episodeId);
      return res.status(HttpStatus.OK).json(comments);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao buscar os comentários, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Get('user/:userId')
  async findAllByUser(@Res() res, @Param('userId') userId: number) {
    try {
      const comments = await this.commentsService.findByUser(userId);
      return res.status(HttpStatus.OK).json(comments);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao buscar os comentários do usuário, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Post('create')
  async create(
    @Request() req: AuthRequest,
    @Res() res,
    @Body() createCommentsDto: CreateCommentsDto,
  ) {
    try {
      const currentUser = req.user.id;
      const comment = await this.commentsService.create(currentUser, createCommentsDto);

      return res.status(HttpStatus.CREATED).json(comment);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      } else if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao criar o comentário, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Put(':id')
  async update(
    @Request() req: AuthRequest,
    @Param('id') id: number,
    @Res() res,
    @Body() updateCommentsDto: UpdateCommentsDto,
  ) {
    try {
      const currentUser = req.user.id;
      const comment = await this.commentsService.update(currentUser, id, updateCommentsDto);

      return res.status(HttpStatus.OK).json(comment);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      } else if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao atualizar o comentário, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Delete(':id')
  async remove(@Request() req: AuthRequest, @Res() res, @Param('id') id: number) {
    try {
      const currentUser = req.user.id;
      await this.commentsService.remove({ userId: currentUser, id });

      return res.status(HttpStatus.OK).json({ mesage: 'Comentário removido!' });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      } else if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao deletar o comentário, ' + error.message });
    }
  }
}
