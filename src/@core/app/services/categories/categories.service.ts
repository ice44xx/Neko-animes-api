import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from '../../../domain/entities/categories/categories.entity';
import { CreateCategoriesDto } from '../../dto/requests/categories/create-categories-dto';
import { UpdateCategoryDto } from '../../dto/requests/categories/update-categories-dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async findAll() {
    try {
      return this.categoriesRepository.find({ relations: ['animes'] });
    } catch (error) {
      throw new Error('Ocorreu um erro ao encontrar todas categorias, ') + error.message;
    }
  }

  async findByName(name: string) {
    try {
      const category = await this.categoriesRepository.findOne({
        where: { name },
      });
      if (!category) {
        throw new NotFoundException(`Categoria ${name} não foi encontrada`);
      }
      return category;
    } catch (error) {
      throw (
        new Error(`Ocorreu um erro ao procurar a categoria ${name}, `) + error.message
      );
    }
  }

  async create(createCategoryDto: CreateCategoriesDto) {
    try {
      const lowerCaseName = createCategoryDto.name.toLocaleLowerCase();
      const newCategory = this.categoriesRepository.create({
        ...createCategoryDto,
        name: lowerCaseName,
      });
      return this.categoriesRepository.save(newCategory);
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar a categoria, ') + error.message;
    }
  }

  async update(id: number, { name }: UpdateCategoryDto) {
    try {
      const nameLower = name.toLocaleLowerCase();

      const categoryUpdate = await this.categoriesRepository.findOne({
        where: { id },
      });

      categoryUpdate.name = nameLower;

      const category = await this.categoriesRepository.save(categoryUpdate);
      return category;
    } catch (error) {
      throw new Error('Ocorreu um erro ao atualizar a categoria, ') + error.message;
    }
  }

  async delete(name: string) {
    try {
      const category = await this.categoriesRepository.findOne({
        where: { name },
      });
      if (!category) {
        throw new NotFoundException(`Categoria ${name} não encontrada.`);
      }
      this.categoriesRepository.remove(category);
    } catch (error) {
      throw new Error('Ocorreu um erro ao deletar a categoria, ') + error.message;
    }
  }
}
