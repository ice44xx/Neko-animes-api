import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { TypesAnimesDto } from 'src/@core/app/dto/type/types-dto';
import { CreateTypesAnimesDto } from 'src/@core/app/dto/type/create-types-dto';
import { UpdateTypesAnimesDto } from 'src/@core/app/dto/type/update-types-dto';
import { TypesAnimesRepository } from '../../repositories/type/types.repository';

@Injectable()
export class TypesAnimesUseCase {
  constructor(private readonly typesAnimesRepository: TypesAnimesRepository) {}

  async findAll() {
    const type = await this.typesAnimesRepository.findAll();
    return type;
  }

  async findByName({ name }: TypesAnimesDto) {
    const type = await this.typesAnimesRepository.findByName(name);

    if (!type) {
      throw new NotFoundException('Tipo não encontrado');
    }

    return type;
  }

  async create({ name }: CreateTypesAnimesDto) {
    const nameLower = name.toLocaleLowerCase();

    const existingTypesAnimesName = await this.typesAnimesRepository.findByName(name);

    if (existingTypesAnimesName) {
      throw new ConflictException('Já existe um tipo com este nome');
    }

    const newTypes = await this.typesAnimesRepository.create({
      name: nameLower,
    });

    return newTypes;
  }

  async update(id: number, { name }: UpdateTypesAnimesDto) {
    const type = await this.typesAnimesRepository.findById(id);
    const nameLower = name.toLocaleLowerCase();

    if (!type) {
      throw new NotFoundException(`Este tipo ${id} não foi encontrado`);
    }

    const existingTypesAnimesName = await this.typesAnimesRepository.findByName(name);

    if (existingTypesAnimesName) {
      throw new ConflictException('Já existe um tipo com este nome');
    }

    const updateTypeAnimes = await this.typesAnimesRepository.update(id, {
      name: nameLower,
    });

    return updateTypeAnimes;
  }

  async remove({ id }: TypesAnimesDto) {
    const type = await this.typesAnimesRepository.findById(id);

    if (!type) {
      throw new NotFoundException('Tipo não encontrado');
    }

    await this.typesAnimesRepository.delete(id);
  }
}
