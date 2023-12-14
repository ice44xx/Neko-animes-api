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
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Planos de fundo')
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

  @Roles(UserType.Admin)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    await this.backgroundsService.delete(id);
  }
}
