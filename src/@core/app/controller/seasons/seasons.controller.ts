import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { SeasonsService } from '../../services/seasons/seasons.service';
import { CreateSeasonsDto } from '../../dto/seasons/create-seasons-dto';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { UpdateSeasonsDto } from '../../dto/seasons/update-seasons-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Temporadas')
@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Public()
  @Get()
  async findAll(@Res() res) {
    try {
      const seasons = await this.seasonsService.findAll();
      return res.status(200).json(seasons);
    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao buscar todas temporadas' });
    }
  }

  @Public()
  @Get(':name')
  async findByName(@Res() res, @Param('name') name: string) {
    try {
      const seasons = await this.seasonsService.findByName({ name });
      return res.status(200).json(seasons);
    } catch (error) {
      return res.status(500).send({ message: `Ocorreu um erro ao buscar a temporda ${name} ` });
    }
  }

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createSeasonsDto: CreateSeasonsDto) {
    try {
      const season = await this.seasonsService.create(createSeasonsDto);
      return res.status(201).json(season);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      } else if (error instanceof ConflictException) {
        return res.status(409).send({ message: error.message });
      }
      return res.status(500).send({ message: 'Ocorreu um erro ao criar a temporada' });
    }
  }

  @Roles(UserType.Admin)
  @Put(':seasonId')
  async update(
    @Res() res,
    @Param('seasonId') seasonId: number,
    @Body() updateSeasonsDto: UpdateSeasonsDto,
  ) {
    try {
      const season = await this.seasonsService.update(seasonId, updateSeasonsDto);
      return res.status(200).json(season);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res.status(500).send({ message: 'Ocorreu um erro ao atualizar a temporada' });
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    try {
      await this.seasonsService.remove({ id });
      return res.status(200).send({ message: 'Temporada deletada!' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res.status(500).send({ message: 'Ocorreu um erro ao deletar a temporada' });
    }
  }
}
