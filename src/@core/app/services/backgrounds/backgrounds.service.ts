import { Injectable } from '@nestjs/common';
import { BackgroundsUseCase } from 'src/@core/domain/usecases/backgrounds/backgrounds.usecase';
import { CreateBackgroundsDto } from '../../dto/backgrounds/create-backgrounds-dto';
import { UpdateBackgroundsDto } from '../../dto/backgrounds/update-backgrounds-dto';
import { BackgroundsDto } from '../../dto/backgrounds/backgrounds-dto';

@Injectable()
export class BackgroundsService {
  constructor(private readonly backgroundUseCase: BackgroundsUseCase) {}

  async findAll() {
    return await this.backgroundUseCase.findAll();
  }

  async create(createBackgroundsDto: CreateBackgroundsDto) {
    return await this.backgroundUseCase.create(createBackgroundsDto);
  }

  async update(id: number, updateBackgroundsDto: UpdateBackgroundsDto) {
    return await this.backgroundUseCase.update(id, updateBackgroundsDto);
  }

  async remove({ id }: BackgroundsDto) {
    return await this.backgroundUseCase.remove({ id });
  }
}
