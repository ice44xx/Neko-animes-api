import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
  Res,
} from '@nestjs/common';
import { CommentsService } from '../../services/comments/comments.service';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { CreateCommentsDto } from '../../dto/requests/comments/create-comments-dto';
import { UpdateCommentsDto } from '../../dto/requests/comments/update-comments-dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findByUser(@Res() res, @Request() req: AuthRequest) {
    try {
      const currentUser = req.user.id;
      const comment = await this.commentsService.findByUser(currentUser);
      return res.status(201).json(comment);
    } catch (error) {
      return res.status(500).send({ message: 'Erro ao encontrar os comentários' });
    }
  }

  @Public()
  @Get(':episodeId')
  async findByEpisode(@Res() res, @Param('episodeId') episodeId: number) {
    try {
      const comment = await this.commentsService.findAllByEpisode(episodeId);
      return res.status(201).json(comment);
    } catch (error) {
      return res.status(500).send({ message: 'Erro ao encontrar os comentários' });
    }
  }

  @Post()
  async create(
    @Res() res,
    @Request() req: AuthRequest,
    @Body() createCommentDto: CreateCommentsDto,
  ) {
    try {
      const currentUser = req.user.id;
      const comment = await this.commentsService.create(currentUser, createCommentDto);
      return res.status(201).json(comment);
    } catch (error) {
      return res.status(500).send({ message: 'Erro ao criar o comentário' });
    }
  }

  @Put(':id')
  async update(
    @Res() res,
    @Request() req: AuthRequest,
    @Param('id') id: number,
    @Body() updateCommentsDto: UpdateCommentsDto,
  ) {
    try {
      const currentUser = req.user.id;
      const comment = await this.commentsService.update(
        currentUser,
        id,
        updateCommentsDto,
      );
      return res.status(201).json(comment);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Erro ao encontrar e atualizar o comentário' });
    }
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Request() req: AuthRequest, @Param('id') id: number) {
    const currentUser = req.user.id;
    await this.commentsService.delete(currentUser, id);
  }
}
