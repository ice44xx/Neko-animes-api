import { Body, ConflictException, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { ErrorsServices } from '../../services/errors/errors.service';
import { CreateErrorsDto } from '../../dto/errors/create-errors-dto';

@ApiTags('Erros de episódios')
@Controller('errors')
export class ErrorsController {
  constructor(private readonly errorsService: ErrorsServices) {}

  @Roles(UserType.Admin)
  @Get()
  async findAll(@Res() res) {
    try {
      const error = await this.errorsService.findAll();
      return res.status(HttpStatus.OK).send(error);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Ocorreu um erro ao buscar os erros dos episódios, ' + error.message });
    }
  }

  @Public()
  @Get(':error')
  async findByError(@Res() res, @Param('error') episodeId: number) {
    try {
      const error = await this.errorsService.findByError({ episodeId });
      return res.status(HttpStatus.OK).send(error);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Ocorreu um erro ao buscar o erro do episódio, ' + error.message });
    }
  }

  @Public()
  @Post('create')
  async create(@Res() res, @Body() createErrosDto: CreateErrorsDto) {
    try {
      const error = await this.errorsService.create(createErrosDto);
      return res.status(HttpStatus.CREATED).send(error);
    } catch (error) {
      if (error instanceof ConflictException) {
        return res.status(HttpStatus.CONFLICT).send({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Ocorreu um erro ao criar o erro do episódio, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Delete(':episodeId')
  async remove(@Res() res, @Param('episodeId') episodeId: number) {
    try {
      await this.errorsService.remove({ episodeId });
      return res.status(HttpStatus.OK).send({ message: 'Erro do episódio deletado com sucesso' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Ocorreu um erro ao deletar o erro do episódio, ' + error.message });
    }
  }
}
