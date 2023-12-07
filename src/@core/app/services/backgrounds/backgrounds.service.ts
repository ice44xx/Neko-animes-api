import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Backgrounds } from 'src/@core/domain/entities/backgrounds/backgrounds.entity';
import { Not, Repository } from 'typeorm';
import { CreateBackgroundsDto } from '../../dto/requests/backgrounds/create-backgrounds-dto';
import { UpdateBackgroundsDto } from '../../dto/requests/backgrounds/update-backgrounds-dto';

@Injectable()
export class BackgroundsService {
  constructor(
    @InjectRepository(Backgrounds)
    private readonly backgroundsRepository: Repository<Backgrounds>,
  ) {}

  findAll() {
    try {
      const background = this.backgroundsRepository.find();
      return background;
    } catch (error) {
      throw new Error('Ocorreu um erro ao encontrar todos backgrounds') + error.message;
    }
  }

  create(createBackgroundsDto: CreateBackgroundsDto) {
    try {
      const background = this.backgroundsRepository.create(createBackgroundsDto);
      return this.backgroundsRepository.save(background);
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar o background') + error.message;
    }
  }

  async update(id: number, updateBackgroundsDto: UpdateBackgroundsDto) {
    try {
      const background = await this.backgroundsRepository.findOne({
        where: { id },
      });
      if (!background) {
        throw new NotFoundException('Background não encontrado');
      }

      Object.assign(background, updateBackgroundsDto);
      return this.backgroundsRepository.save(background);
    } catch (error) {
      throw new Error('Ocorreu um erro ao atualizar o background') + error.message;
    }
  }

  delete(id: number) {
    try {
      const background = this.backgroundsRepository.delete(id);
      return background;
    } catch (error) {
      throw new Error('Ocorreu um erro ao deletar o background') + error.message;
    }
  }
}
