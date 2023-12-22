import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ClassificationsRepository } from '../../repositories/classifications/classifications.repository';
import { CreateClassificationsDto } from 'src/@core/app/dto/classifications/create-classifications-dto';
import { UpdateClassificationsDto } from 'src/@core/app/dto/classifications/update-classifications-dto';
import { ClassificationsDto } from 'src/@core/app/dto/classifications/classifications-dto';

@Injectable()
export class ClassificationsUseCase {
  constructor(private readonly classificationsRepository: ClassificationsRepository) {}

  async findAll() {
    const classification = await this.classificationsRepository.findAll();
    return classification;
  }

  async create({ name, ...classificationData }: CreateClassificationsDto) {
    const nameLower = name.toLocaleLowerCase();

    const existingClassificationName = await this.classificationsRepository.findByName(name);

    if (existingClassificationName) {
      throw new ConflictException('Já existe uma Classificação com este nome');
    }

    const newClassification = await this.classificationsRepository.create({
      name: nameLower,
      ...classificationData,
    });

    return newClassification;
  }

  async update(id: number, { name, ...classificationData }: UpdateClassificationsDto) {
    const classification = await this.classificationsRepository.findById(id);
    const nameLower = name.toLocaleLowerCase();

    if (!classification) {
      throw new NotFoundException(`Classificação ${id} não foi encontrada`);
    }

    const existingClassificationName = await this.classificationsRepository.findByName(name);

    if (existingClassificationName) {
      throw new ConflictException('Já existe uma Classificação com este nome');
    }

    const updateClassification = await this.classificationsRepository.update(id, {
      name: nameLower,
      ...classificationData,
    });

    return updateClassification;
  }

  async remove({ id }: ClassificationsDto) {
    const classification = await this.classificationsRepository.findById(id);

    if (!classification) {
      throw new NotFoundException('Classificação não encontrada');
    }

    await this.classificationsRepository.delete(id);
  }
}
