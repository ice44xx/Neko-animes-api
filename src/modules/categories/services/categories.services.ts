import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from '../entities/categories.entity';
import { CreateCategoriesDto } from '../dtos/create-categories-dto';
import { UpdateCategoryDto } from '../dtos/update-categories-dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async findAll() {
    return this.categoriesRepository.find();
  }

  async findByName(name: string) {
    const category = await this.categoriesRepository.findOne({
      where: { name },
    });
    if (!category) {
      throw new NotFoundException(`Categoria ${name} não foi encontrada`);
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoriesDto) {
    const lowerCaseName = createCategoryDto.name.toLocaleLowerCase();
    const newCategory = this.categoriesRepository.create({
      ...createCategoryDto,
      name: lowerCaseName,
    });
    return this.categoriesRepository.save(newCategory);
  }

  async update(id: number, { name, position }: UpdateCategoryDto) {
    const nameLower = name.toLocaleLowerCase();

    const categoryUpdate = await this.categoriesRepository.findOne({
      where: { id },
    });

    categoryUpdate.name = nameLower;
    categoryUpdate.position = position;

    const category = await this.categoriesRepository.save(categoryUpdate);
    return category;
  }

  async delete(name: string) {
    const category = await this.categoriesRepository.findOne({
      where: { name },
    });
    if (!category) {
      throw new NotFoundException(`Categoria ${name} não encontrada.`);
    }
    this.categoriesRepository.remove(category);
  }
}
