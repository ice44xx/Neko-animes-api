import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { BackgroundsService } from '../../services/backgrounds/backgrounds.service';
import { UpdateBackgroundsDto } from '../../dto/requests/backgrounds/update-backgrounds-dto';
import { CreateBackgroundsDto } from '../../dto/requests/backgrounds/create-backgrounds-dto';

@Controller('backgrounds')
export class BackgroundsController {
  constructor(private readonly backgroundsService: BackgroundsService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    const background = await this.backgroundsService.findAll();
    return background;
  }

  @Public()
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() createBackgroundsDto: CreateBackgroundsDto) {
    const background = await this.backgroundsService.create(createBackgroundsDto);
    return background;
  }

  @Public()
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body() updateBackgrounds: UpdateBackgroundsDto) {
    const background = await this.backgroundsService.update(id, updateBackgrounds);
    return background;
  }

  @Public()
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    await this.backgroundsService.delete(id);
  }
}
