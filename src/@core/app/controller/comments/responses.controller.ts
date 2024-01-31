import { Body, Controller, Delete, HttpStatus, NotFoundException, Param, Post, Request, Res, UnauthorizedException } from '@nestjs/common';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { AuthRequest } from 'src/@core/infra/auth/models/auth-request';
import { ApiTags } from '@nestjs/swagger';
import { ResponsesService } from '../../services/comments/responses.service';
import { CreateResponsesDto } from '../../dto/comments/create-responses-dto';

@ApiTags('Respostas de comentário')
@Controller('responses-comments')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Roles(UserType.User)
  @Post('create')
  async create(@Request() req: AuthRequest, @Res() res, @Body() createResponsesDto: CreateResponsesDto) {
    try {
      const currentUser = req.user.id;
      const comment = await this.responsesService.create(currentUser, createResponsesDto);

      return res.status(HttpStatus.CREATED).send(comment);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).send({ message: error.message });
      } else if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro ao criar o comentário, ' + error.message });
    }
  }

  @Roles(UserType.User)
  @Delete(':id')
  async remove(@Request() req: AuthRequest, @Res() res, @Param('id') id: number) {
    try {
      const currentUser = req.user.id;
      await this.responsesService.remove({ userId: currentUser, id });

      return res.status(HttpStatus.OK).send({ mesage: 'Comentário removido!' });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).send({ message: error.message });
      } else if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro ao deletar o comentário, ' + error.message });
    }
  }
}
