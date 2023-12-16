import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateAnimesDto } from '../../dto/animes/create-animes-dto';
import { AnimesService } from '../../services/animes/animes.service';

@ApiTags('Animes')
@Controller('animes')
export class AnimesController {
  constructor(private readonly animesService: AnimesService) {}

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createAnimesDto: CreateAnimesDto) {}

  @Roles(UserType.Admin)
  @Get()
  async findAll() {}
}
