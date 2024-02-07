import { Injectable } from '@nestjs/common';
import { CategoriesUseCase } from 'src/@core/domain/usecases/categories/categories.usecase';
import { CreateCategoriesDto } from '../../dto/categories/create-categories-dto';
import { UpdateCategoriesDto } from '../../dto/categories/update-categories-dto';
import { CategoriesDto } from '../../dto/categories/categories-dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesUseCase: CategoriesUseCase) {}

  async findAll() {
    return await this.categoriesUseCase.findAll();
  }

  async findById({ id }: CategoriesDto) {
    return await this.categoriesUseCase.findById({ id });
  }

  async findByName({ name }: CreateCategoriesDto) {
    return await this.categoriesUseCase.findByName({ name });
  }

  async create(createCategoriesDto: CreateCategoriesDto) {
    return await this.categoriesUseCase.create(createCategoriesDto);
  }

  async update(id: number, updateCategoriesDto: UpdateCategoriesDto) {
    return await this.categoriesUseCase.update(id, updateCategoriesDto);
  }

  async remove({ id }: CategoriesDto) {
    return await this.categoriesUseCase.remove({ id });
  }
}
