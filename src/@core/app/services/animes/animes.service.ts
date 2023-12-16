import { Injectable } from '@nestjs/common';
import { CreateAnimesDto } from '../../dto/animes/create-animes-dto';
import { AnimesUseCase } from 'src/@core/domain/usecases/animes/animes.usecase';

@Injectable()
export class AnimesService {
  constructor(private readonly animesUseCase: AnimesUseCase) {}

  async findAll() {
    try {
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar as roles, ' + error.message);
    }
  }

  async create(createAnimesDto: CreateAnimesDto) {
    try {
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar a role, ' + error.message);
    }
  }
}
