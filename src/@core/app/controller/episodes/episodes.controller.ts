import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
      return res.status(HttpStatus.OK).json(episodes);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao buscar todos os episódios, ' + error.message });
    }
  }

  @Public()
  @Get('newest')
  async findTop10Newest(@Res() res) {
    try {
      const episodes = await this.episodesService.findTop10Newest();
      return res.status(HttpStatus.OK).json(episodes);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao buscar os top 10 episódios, ' + error.message });
    }
  }

  @Public()
  @Get('name/:name')
  async findByAnimeName(@Res() res, @Param('name') name: string) {
    try {
      const episode = await this.episodesService.findByAnimeName(name);
      return res.status(HttpStatus.OK).json(episode);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: `Ocorreu um erro ao buscar o episódio ${name}, ` + error.message });
    }
  }

  @Public()
  @Get('animeId/:id')
  async findByAnimeId(@Res() res, @Param('id') id: number) {
    try {
      const episode = await this.episodesService.findByAnimeId(id);
      return res.status(HttpStatus.OK).json(episode);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: `Ocorreu um erro ao buscar o episódio ${id}, ` + error.message });
    }
  }

  @Public()
  @Get('id/:id')
  async findById(@Res() res, @Param('id') id: number) {
    try {
      const episode = await this.episodesService.findById({ id });
      return res.status(HttpStatus.OK).json(episode);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: `Ocorreu um erro ao buscar o episódio ${id}, ` + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createEpisodesDto: CreateEpisodesDto) {
    try {
      const episode = await this.episodesService.create(createEpisodesDto);
      return res.status(HttpStatus.CREATED).json(episode);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao criar o episódio, ' + error.message });
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
      return res.status(HttpStatus.OK).json(episode);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao atualizar o episódio, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    try {
      await this.episodesService.remove({ id });
      return res.status(HttpStatus.OK).json({ message: 'Episódio deletado com sucesso!' });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Ocorreu um erro ao deletar o episódio, ' + error.message });
    }
  }
}
