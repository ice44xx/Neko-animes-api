import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { SeasonsService } from '../../services/seasons/seasons.service';
import { CreateSeasonsDto } from '../../dto/requests/seasons/create-seasons-dto';
import { UpdateSeasonsDto } from '../../dto/requests/seasons/update-seasons-dto';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Temporadas')
@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Public()
  @Get()
  findAll(@Res() res) {
    try {
      const season = this.seasonsService.findAll();
      return res.status(201).json(season);
    } catch (error) {
      return res.status(500).send({ message: 'Erro ao buscar todas temporadas' });
    }
  }

  @Public()
  @Get(':name')
  async findByName(@Res() res, @Param('name') name: string) {
    try {
      const season = await this.seasonsService.findByName(name);
      return res.status(201).send(season);
    } catch (error) {
      return res.status(500).send({ message: `Erro ao buscar a  temporada ${name}` });
    }
  }

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createSeasonDto: CreateSeasonsDto) {
    try {
      const season = await this.seasonsService.create(createSeasonDto);
      return season;
    } catch (error) {
      return res.status(500).send({ message: 'Erro ao criar temporada' });
    }
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(
    @Res() res,
    @Body() updateSeasonsDto: UpdateSeasonsDto,
    @Param('id') id: number,
  ) {
    try {
      this.seasonsService.update(id, updateSeasonsDto);
      return res.status(201).json({ message: 'Temporada atualizada' });
    } catch (error) {
      return res.status(500).send({ message: 'Erro ao atualizar temporada' });
    }
  }

  @Roles(UserType.Admin)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    await this.seasonsService.delete(id);
    return res.status(201).send({ message: 'Temporada deletada' });
  }
}
