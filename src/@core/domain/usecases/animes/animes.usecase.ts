import { Injectable } from '@nestjs/common';
import { CreateAnimesDto } from 'src/@core/app/dto/animes/create-animes-dto';
import { UpdateAnimesDto } from 'src/@core/app/dto/animes/update-animes-dto';
import { AnimesRepository } from 'src/@core/domain/repositories/animes/animes.repository';
import { CategoriesRepository } from '../../repositories/categories/categories.repository';

@Injectable()
export class AnimesUseCase {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly animesRepository: AnimesRepository,
  ) {}

  async findAll() {
    try {
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar os animes, ' + error.message);
    }
  }

  async findByName(name: string) {
    try {
    } catch (error) {
      throw new Error(`Ocorreu um erro ao buscar o anime, ${name} ` + error.message);
    }
  }

  async create(createAnimesDto: CreateAnimesDto) {
    try {
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar o anime, ' + error.message);
    }
  }

  async update(updateAnimesDto: UpdateAnimesDto) {
    try {
    } catch (error) {
      throw new Error('Ocorreu um erro ao atualizar o anime, ' + error.message);
    }
  }

  async remove(id: number) {
    try {
    } catch (error) {
      throw new Error('Ocorreu um erro ao deletar o anime, ' + error.message);
    }
  }
}
