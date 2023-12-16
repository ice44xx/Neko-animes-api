import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from '../../repositories/categories/categories.repository';
import { CreateCategoriesDto } from 'src/@core/app/dto/categories/create-categories-dto';

@Injectable()
export class CategoriesUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAll() {
    try {
      const categories = await this.categoriesRepository.findAll();
      return categories;
    } catch (error) {
      throw new Error('Ocorreu um erro ao encontrar a categoria, ') + error.message;
    }
  }

  async create({ name }: CreateCategoriesDto) {
    try {
      const nameLower = name.toLocaleLowerCase();

      const existingCategoryName = await this.categoriesRepository.findByName(name);

      if (existingCategoryName) {
        throw new Error('Já existe uma categoria com este nome');
      }

      const newCategory = this.categoriesRepository.create({
        name: nameLower,
      });

      return newCategory;
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar a categoria, ') + error.message;
    }
  }

  async update(id: number, { name }: CreateCategoriesDto) {
    try {
      const categories = await this.categoriesRepository.findById(id);
      const nameLower = name.toLocaleLowerCase();

      if (!categories) {
        throw new NotFoundException(`Categoria ${id} não foi encontrada`);
      }

      const existingCategoryName = await this.categoriesRepository.findByName(name);

      if (existingCategoryName) {
        throw new Error('Já existe uma categoria com este nome');
      }

      const updateCategory = await this.categoriesRepository.update(id, {
        name: nameLower,
      });

      return updateCategory;
    } catch (error) {
      throw new Error('Ocorreu um erro ao atualizar a categoria, ') + error.message;
    }
  }

  async remove(id: number) {
    try {
      const categories = await this.categoriesRepository.findById(id);

      if (!categories) {
        throw new NotFoundException('Categoria não encontrada');
      }

      await this.categoriesRepository.delete(id);
    } catch (error) {
      throw new Error('Ocorreu um erro ao deletar a categoria, ') + error.message;
    }
  }
}
