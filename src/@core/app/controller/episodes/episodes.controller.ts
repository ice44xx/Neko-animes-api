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

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  findAll() {}

  @Post('create')
  create(@Body() createEpisodesDto: CreateEpisodesDto) {
    const episode = this.episodesService.create(createEpisodesDto);
    return episode;
  }
}
