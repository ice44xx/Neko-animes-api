import { Injectable } from '@nestjs/common';
import { ClassificationsUseCase } from 'src/@core/domain/usecases/classifications/classifications.usecase';
import { CreateClassificationsDto } from '../../dto/classifications/create-classifications-dto';
import { UpdateClassificationsDto } from '../../dto/classifications/update-classifications-dto';
import { ClassificationsDto } from '../../dto/classifications/classifications-dto';

@Injectable()
export class ClassificationsService {
  constructor(private readonly classificationsUseCase: ClassificationsUseCase) {}

  async findAll() {
    return await this.classificationsUseCase.findAll();
  }

  async findById({ id }: ClassificationsDto) {
    return await this.classificationsUseCase.findById({ id });
  }

  async findByName({ name }: ClassificationsDto) {
    return await this.classificationsUseCase.findByName({ name });
  }

  async create(createClassificationsDto: CreateClassificationsDto) {
    return await this.classificationsUseCase.create(createClassificationsDto);
  }

  async update(id: number, updateClassificationsDto: UpdateClassificationsDto) {
    return await this.classificationsUseCase.update(id, updateClassificationsDto);
  }

  async remove({ id }: ClassificationsDto) {
    return await this.classificationsUseCase.remove({ id });
  }
}
