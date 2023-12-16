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
import { Public } from 'src/@core/infra/decorators/public-route.decorator';
import { Roles, UserType } from 'src/@core/infra/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoriesDto } from '../../dto/categories/create-categories-dto';
import { UpdateCategoriesDto } from '../../dto/categories/update-categories-dto';

@ApiTags('Categorias')
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

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createCategoriesDto: CreateCategoriesDto) {
    try {
      const category = await this.categoriesService.create(createCategoriesDto);
      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).send({ message: 'Ocorreu um erro ao criar a categoria' });
    }
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(
    @Res() res,
    @Param('id') id: number,
    @Body() updateCategoriesDto: UpdateCategoriesDto,
  ) {
    try {
      const category = await this.categoriesService.update(id, updateCategoriesDto);
      return res.status(200).json(category);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao atualizar a categoria' });
    }
  }

  @Roles(UserType.Admin)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.categoriesService.remove(id);
  }
}
