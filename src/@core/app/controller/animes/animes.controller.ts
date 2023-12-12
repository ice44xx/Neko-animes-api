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
  UseGuards,
} from '@nestjs/common';
import { AnimesService } from '../../services/animes/animes.service';
import { CreateAnimesDto } from '../../dto/requests/animes/create-animes-dto';
import { UpdateAnimesDto } from '../../dto/requests/animes/update-animes-dto';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';

@Controller('animes')
export class AnimesController {
  constructor(private readonly animesService: AnimesService) {}

  @Public()
  @Get()
  async findAll(@Res() res) {
    try {
      const anime = await this.animesService.findAll();
      return res.status(201).send(anime);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao buscar todos os animes' });
    }
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: number, @Res() res) {
    try {
      const anime = await this.animesService.findById(id);
      return res.status(201).send(anime);
    } catch (error) {
      return res.status(500).send({ message: `Ocorreu um erro ao buscar o anime ${id}` });
    }
  }

  @Public()
  @Get('name/:name')
  async findByName(@Param('name') name: string, @Res() res) {
    try {
      const anime = await this.animesService.findByName(name);
      return res.status(201).send(anime);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Ocorreu um erro ao buscar o anime ${name}` });
    }
  }

  @Public()
  @Get()
  async findLastsReleases(@Res() res) {
    try {
      const anime = await this.animesService.findLastReleases();
      return res.status(201).send(anime);
    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao buscar os animes' });
    }
  }

  @Post('create')
  async create(@Res() res, @Body() createAnimesDto: CreateAnimesDto) {
    try {
      const anime = await this.animesService.create(createAnimesDto);
      return res.status(201).json(anime);
    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao criar o anime' });
    }
  }

  @Put(':id')
  async update(
    @Res() res,
    @Param('id') id: number,
    @Body() updateAnimesDto: UpdateAnimesDto,
  ) {
    try {
      const anime = await this.animesService.update(id, updateAnimesDto);
      return res.status(201).json(anime);
    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao atualizar o anime' });
    }
  }

  @Public()
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.animesService.delete(id);
  }
}
