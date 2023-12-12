import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { BackgroundsService } from '../../services/backgrounds/backgrounds.service';
import { UpdateBackgroundsDto } from '../../dto/requests/backgrounds/update-backgrounds-dto';
import { CreateBackgroundsDto } from '../../dto/requests/backgrounds/create-backgrounds-dto';

@Controller('backgrounds')
export class BackgroundsController {
  constructor(private readonly backgroundsService: BackgroundsService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Res() res) {
    try {
      const background = await this.backgroundsService.findAll();
      return background;
    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao buscar os background' });
    }
  }

  @Public()
  @Post('create')
  async create(@Res() res, @Body() createBackgroundsDto: CreateBackgroundsDto) {
    try {
      const background = await this.backgroundsService.create(createBackgroundsDto);
      return res.status(201).json(background);
    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao criar o background' });
    }
  }

  @Public()
  @Put(':id')
  async update(
    @Res() res,
    @Param('id') id: number,
    @Body() updateBackgrounds: UpdateBackgroundsDto,
  ) {
    try {
      const background = await this.backgroundsService.update(id, updateBackgrounds);
      return background;
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao atualizar o background' });
    }
  }

  @Public()
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    await this.backgroundsService.delete(id);
  }
}
