import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
      return res.status(200).json(categories);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao buscar as categorias, ' + error.message });
    }
  }

  @Public()
  @Get(':name')
  async findByName(@Res() res, @Param('name') name: string) {
    try {
      const categories = await this.categoriesService.findByName({ name });
      return res.status(200).json(categories);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: `Ocorreu um erro ao buscar a categoria ${name}, ` + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Post('create')
  async create(@Res() res, @Body() createCategoriesDto: CreateCategoriesDto) {
    try {
      const category = await this.categoriesService.create(createCategoriesDto);
      return res.status(201).json(category);
    } catch (error) {
      if (error instanceof ConflictException) {
        return res.status(409).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao criar a categoria, ' + error.message });
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
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      } else if (error instanceof ConflictException) {
        return res.status(409).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao atualizar a categoria, ' + error.message });
    }
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    try {
      await this.categoriesService.remove({ id });
      return res.status(200).send({ message: 'Categoria deletada com sucesso' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).send({ message: error.message });
      }
      return res
        .status(500)
        .send({ message: 'Ocorreu um erro ao deletar a categoria, ' + error.message });
    }
  }
}
