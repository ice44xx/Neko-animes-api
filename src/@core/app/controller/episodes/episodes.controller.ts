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
import { EpisodesService } from '../../services/episodes/episodes.service';
import { CreateEpisodesDto } from '../../dto/episodes/create-episodes-dto';
import { UpdateEpisodesDto } from '../../dto/episodes/update-episodes-dto';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Episódios')
@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Public()
  @Get()
  async findAll(@Res() res) {
    try {
      const episodes = await this.episodesService.findAll();
      return res.status(200).json(episodes);
    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao buscar todos os episódios' });
    }
  }

  @Public()
  @Get(':id')
  async findById(@Res() res, @Param('id') id: number) {
    try {
      const episode = await this.episodesService.findById({ id });
      return res.status(200).json(episode);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res.status(500).send({ message: `Ocorreu um erro ao buscar o episódio ${id}` });
    }
  }

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createEpisodesDto: CreateEpisodesDto) {
    try {
      const episode = await this.episodesService.create(createEpisodesDto);
      return res.status(201).json(episode);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res.status(500).send({ message: 'Ocorreu um erro ao criar o episódio' });
    }
  }

  @Roles(UserType.Admin)
  @Put(':episodeId')
  async update(
    @Res() res,
    @Param('episodeId') episodeId: number,
    @Body() updateEpisodesDto: UpdateEpisodesDto,
  ) {
    try {
      const episode = await this.episodesService.update(episodeId, updateEpisodesDto);
      return res.status(200).json(episode);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res.status(500).send({ message: 'Ocorreu um erro ao atualizar o episódio' });
    }
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    try {
      await this.episodesService.remove({ id });
      return res.status(200).json({ message: 'Episódio deletado com sucesso!' });
    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao deletar o episódio' });
    }
  }
}
