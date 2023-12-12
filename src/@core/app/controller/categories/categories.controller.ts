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
    try {
      const categories = await this.categoriesService.findAll();
      return res.status(201).json(categories);
    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao buscar as categorias' });
    }
  }

  @Public()
  @Get(':name')
  async findByName(@Res() res, @Param('name') name: string) {
    try {
      const category = await this.categoriesService.findByName(name);
      return category;
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Ocorreu um erro ao buscar o background ${name}` });
    }
  }

  @Post('create')
  create(@Res() res, @Body() createCategoriesDto: CreateCategoriesDto) {
    try {
      const category = this.categoriesService.create(createCategoriesDto);
      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao criar a categoria' });
    }
  }

  @Put(':id')
  update(
    @Res() res,
    @Param('id') id: number,
    @Body() updateCategoriesDto: UpdateCategoryDto,
  ) {
    try {
      const category = this.categoriesService.update(id, updateCategoriesDto);
      return res.status(201).json(category);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao atualizar a categoria' });
    }
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') name: string) {
    return this.categoriesService.delete(name);
  }
}
