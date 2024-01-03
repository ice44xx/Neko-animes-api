import { Injectable } from '@nestjs/common';
import { TypesAnimesUseCase } from 'src/@core/domain/usecases/types-animes/types.usecase';
import { TypesAnimesDto } from '../../dto/types-animes/types-dto';
import { UpdateTypesAnimesDto } from '../../dto/types-animes/update-types-dto';
import { CreateTypesAnimesDto } from '../../dto/types-animes/create-types-dto';

@Injectable()
export class TypesAnimesService {
  constructor(private readonly typesAnimesUseCase: TypesAnimesUseCase) {}

  async findAll() {
    return await this.typesAnimesUseCase.findAll();
  }

  async findByName({ name }: TypesAnimesDto) {
    return await this.typesAnimesUseCase.findByName({ name });
  }

  async create(createTypesAnimesDto: CreateTypesAnimesDto) {
    return await this.typesAnimesUseCase.create(createTypesAnimesDto);
  }

  async update(id: number, updateTypesAnimesDto: UpdateTypesAnimesDto) {
    return await this.typesAnimesUseCase.update(id, updateTypesAnimesDto);
  }

  async remove({ id }: TypesAnimesDto) {
    return await this.typesAnimesUseCase.remove({ id });
  }
}
