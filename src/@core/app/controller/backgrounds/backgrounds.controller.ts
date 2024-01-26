import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { BackgroundsService } from '../../services/backgrounds/backgrounds.service';
import { CreateBackgroundsDto } from '../../dto/backgrounds/create-backgrounds-dto';
import { UpdateBackgroundsDto } from '../../dto/backgrounds/update-backgrounds-dto';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Planos de fundos')
@Controller('backgrounds')
export class BackgroundsController {
  constructor(private readonly backgroundsService: BackgroundsService) {}

  @Public()
  @Get()
  async findAll(@Res() res) {
    try {
      const backgrounds = await this.backgroundsService.findAll();
      return res.status(HttpStatus.OK).send(backgrounds);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro ao buscar os backgrounds, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createBackgroundsDto: CreateBackgroundsDto) {
    try {
      const background = await this.backgroundsService.create(createBackgroundsDto);
      return res.status(HttpStatus.CREATED).send(background);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro ao criar o background, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(@Res() res, @Param('id') id: number, @Body() updateBackgroundsDto: UpdateBackgroundsDto) {
    try {
      const background = await this.backgroundsService.update(id, updateBackgroundsDto);

      return res.status(HttpStatus.OK).send(background);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro ao atualizar o background, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    try {
      await this.backgroundsService.remove({ id });
      return res.status(HttpStatus.OK).send({ message: 'Background deletado' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Ocorreu um erro ao deletar o background, ' + error.message });
    }
  }
}
