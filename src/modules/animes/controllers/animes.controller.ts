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

@Controller('animes')
export class AnimesController {
  constructor(private readonly animesService: AnimesService) {}

  @Get()
  async findAll() {}

  @Get()
  async findByName() {}

  @Get()
  async findById() {}

  @Post()
  async create() {}

  @Put()
  async update() {}

  @Delete()
  async delete() {}
}
