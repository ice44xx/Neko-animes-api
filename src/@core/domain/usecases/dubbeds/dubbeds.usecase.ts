import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DubbedsRepository } from '../../repositories/dubbeds/dubbeds.repository';
import { DubbedsDto } from 'src/@core/app/dto/dubbeds/dubbeds-dto';
import { CreateDubbedsDto } from 'src/@core/app/dto/dubbeds/create-dubbeds-dto';

@Injectable()
export class DubbedsUseCase {
  constructor(private readonly dubbedsRepository: DubbedsRepository) {}

  async findAll() {
    const dubbed = await this.dubbedsRepository.findAll();
    return dubbed;
  }

  async findByName({ name }: DubbedsDto) {
    const dubbed = await this.dubbedsRepository.findByName(name);

    if (!dubbed) {
      throw new NotFoundException('Classificação não encontrada');
    }

    return dubbed;
  }

  async create({ name }: CreateDubbedsDto) {
    const nameLower = name.toLocaleLowerCase();

    const existingDubbedName = await this.dubbedsRepository.findByName(name);

    if (existingDubbedName) {
      throw new ConflictException('Já existe um tipo com este nome');
    }

    const newDubbed = await this.dubbedsRepository.create({
      name: nameLower,
    });

    return newDubbed;
  }

  async update(id: number, { name }: CreateDubbedsDto) {
    const dubbed = await this.dubbedsRepository.findById(id);
    const nameLower = name.toLocaleLowerCase();

    if (!dubbed) {
      throw new NotFoundException(`Tipo ${id} não foi encontrada`);
    }

    const existingDubbedName = await this.dubbedsRepository.findByName(name);

    if (existingDubbedName) {
      throw new ConflictException('Já existe um tipo com este nome');
    }

    const updateDubbed = await this.dubbedsRepository.update(id, {
      name: nameLower,
    });

    return updateDubbed;
  }

  async remove({ id }: DubbedsDto) {
    const dubbed = await this.dubbedsRepository.findById(id);

    if (!dubbed) {
      throw new NotFoundException('Tipo não encontrado');
    }

    await this.dubbedsRepository.delete(id);
  }
}
