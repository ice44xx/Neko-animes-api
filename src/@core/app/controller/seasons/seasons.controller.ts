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

@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Get()
  findAll() {}

  @Post('create')
  create(@Body() createSeasonDto: CreateSeasonsDto) {
    const season = this.seasonsService.create(createSeasonDto);
    return season;
  }
}
