import { Injectable } from '@nestjs/common';
import { CreateAnimesDto } from '../../dto/animes/create-animes-dto';
import { AnimesUseCase } from 'src/@core/domain/usecases/animes/animes.usecase';
import { UpdateAnimesDto } from '../../dto/animes/update-animes-dto';
import { AnimesDto } from '../../dto/animes/animes-dto';

@Injectable()
export class AnimesService {
  constructor(private readonly animesUseCase: AnimesUseCase) {}

  async findAll() {
    return await this.animesUseCase.findAll();
  }

  async findAllFeature() {
    return await this.animesUseCase.findAllFeature();
  }

  async findTopNewest() {
    return await this.animesUseCase.findTopNewest();
  }

  async findTopLikes() {
    return await this.animesUseCase.findTopLikes();
  }

  async findTopDub() {
    return await this.animesUseCase.findTopDub();
  }

  async findByName({ name }: AnimesDto) {
    return await this.animesUseCase.findByName({ name });
  }

  async findById({ id }: AnimesDto) {
    return await this.animesUseCase.findById({ id });
  }

  async create(createAnimesDto: CreateAnimesDto) {
    return await this.animesUseCase.create(createAnimesDto);
  }

  async update(animeId: number, updateAnimesDto: UpdateAnimesDto) {
    return await this.animesUseCase.update(animeId, updateAnimesDto);
  }

  async remove({ id }: AnimesDto) {
    return await this.animesUseCase.remove({ id });
  }
}
