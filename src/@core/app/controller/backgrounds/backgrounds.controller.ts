import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
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
      return res.status(200).json(backgrounds);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res.status(500).send({ message: 'Ocorreu um erro ao buscar os backgrounds' });
    }
  }

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createBackgroundsDto: CreateBackgroundsDto) {
    try {
      const background = await this.backgroundsService.create(createBackgroundsDto);
      return res.status(201).json(background);
    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao criar o background' });
    }
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(
    @Res() res,
    @Param('id') id: number,
    @Body() updateBackgroundsDto: UpdateBackgroundsDto,
  ) {
    try {
      const background = await this.backgroundsService.update(id, updateBackgroundsDto);

      return res.status(200).json(background);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res.status(500).send({ message: 'Ocorreu um erro ao atualizar o background' });
    }
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    try {
      await this.backgroundsService.remove({ id });
      return res.status(200).send({ message: 'Background deletado' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res.status(500).send({ message: 'Ocorreu um erro ao deletar o background' });
    }
  }
}
