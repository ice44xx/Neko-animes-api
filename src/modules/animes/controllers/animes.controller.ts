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
import { AnimesService } from '../services/animes.services';
import { CreateAnimesDto } from '../dtos/create-animes-dto';
import { UpdateAnimesDto } from '../dtos/update-animes-dto';

@Controller('animes')
export class AnimesController {
  constructor(private readonly animesService: AnimesService) {}

  @Get()
  async findAll(@Res() res) {
    const anime = await this.animesService.findAll();
    return res.status(201).send(anime);
  }

  @Get(':name')
  async findByName(@Param('name') name: string, @Res() res) {
    const anime = await this.animesService.findByName(name);
    return res.status(201).send(anime);
  }

  @Get(':id')
  async findById(@Param('id') id: number, @Res() res) {
    const anime = await this.animesService.findById(id);
    return res.status(201).send(anime);
  }

  @Post('create')
  async create(@Body() createAnimesDto: CreateAnimesDto) {
    return await this.animesService.create(createAnimesDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAnimesDto: UpdateAnimesDto) {
    const anime = await this.animesService.update(id, updateAnimesDto);
    return anime;
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.animesService.delete(id);
  }
}
