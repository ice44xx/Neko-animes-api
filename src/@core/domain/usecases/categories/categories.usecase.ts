import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from '../../repositories/categories/categories.repository';
import { CreateCategoriesDto } from 'src/@core/app/dto/categories/create-categories-dto';
import { UpdateCategoriesDto } from 'src/@core/app/dto/categories/update-categories-dto';
import { CategoriesDto } from 'src/@core/app/dto/categories/categories-dto';

@Injectable()
export class CategoriesUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAll() {
    const categories = await this.categoriesRepository.findAll();
    return categories;
  }

  async findByName({ name }: CreateCategoriesDto) {
    const categories = await this.categoriesRepository.findByName(name);

    if (!categories) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return categories;
  }

  async create({ name }: CreateCategoriesDto) {
    const nameLower = name.toLocaleLowerCase();

    const existingCategoryName = await this.categoriesRepository.findByName(name);

    if (existingCategoryName) {
      throw new ConflictException('Já existe uma categoria com este nome');
    }

    const newCategory = this.categoriesRepository.create({
      name: nameLower,
    });

    return newCategory;
  }

  async update(id: number, { name }: UpdateCategoriesDto) {
    const categories = await this.categoriesRepository.findById(id);
    const nameLower = name.toLocaleLowerCase();

    if (!categories) {
      throw new NotFoundException(`Categoria ${id} não foi encontrada`);
    }

    const existingCategoryName = await this.categoriesRepository.findByName(name);

    if (existingCategoryName) {
      throw new ConflictException('Já existe uma categoria com este nome');
    }

    const updateCategory = await this.categoriesRepository.update(id, {
      name: nameLower,
    });

    return updateCategory;
  }

  async remove({ id }: CategoriesDto) {
    const categories = await this.categoriesRepository.findById(id);

    if (!categories) {
      throw new NotFoundException('Categoria não encontrada');
    }

    await this.categoriesRepository.remove(id);
  }
}
