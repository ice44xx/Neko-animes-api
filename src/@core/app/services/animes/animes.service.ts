import { Injectable } from '@nestjs/common';
import { CreateAnimesDto } from '../../dto/animes/create-animes-dto';
import { AnimesUseCase } from 'src/@core/domain/usecases/animes/animes.usecase';
import { UpdateAnimesDto } from '../../dto/animes/update-animes-dto';

@Injectable()
export class AnimesService {
  constructor(private readonly animesUseCase: AnimesUseCase) {}

  async findAll() {
    return await this.animesUseCase.findAll();
  }

  async findByName(name: string) {
    return await this.animesUseCase.findByName(name);
  }

  async findById(id: number) {
    return await this.animesUseCase.findById(id);
  }

  async create(createAnimesDto: CreateAnimesDto) {
    return await this.animesUseCase.create(createAnimesDto);
  }

  async update(id: number, updateAnimesDto: UpdateAnimesDto) {
    return await this.animesUseCase.update(id, updateAnimesDto);
  }

  async remove(id: number) {
    return await this.animesUseCase.remove(id);
  }
}
