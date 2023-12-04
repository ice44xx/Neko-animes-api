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
import { EpisodesService } from '../../services/episodes/episodes.service';
import { CreateEpisodesDto } from '../../dto/requests/episodes/create-episodes-dto';
import { UpdateEpisodesDto } from '../../dto/requests/episodes/update-episodes-dto';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  async findAll() {
    const episodes = await this.episodesService.findAll();
    return episodes;
  }

  @Post('create')
  create(@Body() createEpisodesDto: CreateEpisodesDto) {
    const episode = this.episodesService.create(createEpisodesDto);
    return episode;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Res() res,
    @Body() updateEpisodesDto: UpdateEpisodesDto,
  ) {
    const episode = await this.episodesService.update(id, updateEpisodesDto);
    return res.status(201).json(episode);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.episodesService.delete(id);
  }
}
