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
import { CategoriesService } from '../../services/categories/categories.service';
import { CreateCategoriesDto } from '../../dto/requests/categories/create-categories-dto';
import { UpdateCategoryDto } from '../../dto/requests/categories/update-categories-dto';
import { Public } from 'src/@core/infra/decorators/public-route.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @Get()
  async findAll(@Res() res) {
    const categories = await this.categoriesService.findAll();
    return res.status(201).json(categories);
  }

  @Public()
  @Get(':name')
  async findByName(@Param('name') name: string) {
    const category = await this.categoriesService.findByName(name);
    return category;
  }

  @Post('create')
  create(@Body() createCategoriesDto: CreateCategoriesDto) {
    return this.categoriesService.create(createCategoriesDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCategoriesDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoriesDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') name: string) {
    return this.categoriesService.delete(name);
  }
}
