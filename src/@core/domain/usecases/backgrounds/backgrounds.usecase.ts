import { Injectable, NotFoundException } from '@nestjs/common';
import { BackgroundsRepository } from '../../repositories/backgrounds/backgrounds.repository';
import { CreateBackgroundsDto } from 'src/@core/app/dto/backgrounds/create-backgrounds-dto';
import { UpdateBackgroundsDto } from 'src/@core/app/dto/backgrounds/update-backgrounds-dto';
import { BackgroundsDto } from 'src/@core/app/dto/backgrounds/backgrounds-dto';

@Injectable()
export class BackgroundsUseCase {
  constructor(private readonly backgroundsRepository: BackgroundsRepository) {}

  async findAll() {
    const backgrounds = await this.backgroundsRepository.findAll();

    if (backgrounds.length === 0) {
      throw new NotFoundException('Array de backgrounds vazio');
    }

    return backgrounds;
  }

  async create(createBackgroundsDto: CreateBackgroundsDto) {
    return await this.backgroundsRepository.create(createBackgroundsDto);
  }

  async update(id: number, updateBackgroundsDto: UpdateBackgroundsDto) {
    const background = await this.backgroundsRepository.findById(id);

    if (!background) {
      throw new NotFoundException('Background não encontrado');
    }

    const updateBackground = await this.backgroundsRepository.update(id, updateBackgroundsDto);

    return updateBackground;
  }

  async remove({ id }: BackgroundsDto) {
    const background = await this.backgroundsRepository.findById(id);

    if (!background) {
      throw new NotFoundException('Background não encontrado');
    }

    await this.backgroundsRepository.delete(id);
  }
}
