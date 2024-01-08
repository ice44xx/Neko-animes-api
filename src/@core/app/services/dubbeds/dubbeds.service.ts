import { Injectable } from '@nestjs/common';
import { DubbedsUseCase } from 'src/@core/domain/usecases/dubbeds/dubbeds.usecase';
import { DubbedsDto } from '../../dto/dubbeds/dubbeds-dto';
import { CreateDubbedsDto } from '../../dto/dubbeds/create-dubbeds-dto';

@Injectable()
export class DubbedsService {
  constructor(private readonly dubbedsUseCase: DubbedsUseCase) {}

  async findAll() {
    return await this.dubbedsUseCase.findAll();
  }

  async findByName({ name }: DubbedsDto) {
    return await this.dubbedsUseCase.findByName({ name });
  }

  async create(createClassificationsDto: CreateDubbedsDto) {
    return await this.dubbedsUseCase.create(createClassificationsDto);
  }

  async update(id: number, updateClassificationsDto: CreateDubbedsDto) {
    return await this.dubbedsUseCase.update(id, updateClassificationsDto);
  }

  async remove({ id }: DubbedsDto) {
    return await this.dubbedsUseCase.remove({ id });
  }
}
