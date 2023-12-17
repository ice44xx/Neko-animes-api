import { Injectable, NotFoundException } from '@nestjs/common';
import { ClassificationsRepository } from '../../repositories/classifications/classifications.repository';
import { CreateClassificationsDto } from 'src/@core/app/dto/classifications/create-classifications-dto';
import { UpdateClassificationsDto } from 'src/@core/app/dto/classifications/update-classifications-dto';

@Injectable()
export class ClassificationsUseCase {
  constructor(private readonly classificationsRepository: ClassificationsRepository) {}

  async findAll() {
    try {
      const classification = await this.classificationsRepository.findAll();
      return classification;
    } catch (error) {
      throw new Error('Ocorreu um erro ao encontrar a Classificação, ') + error.message;
    }
  }

  async create({ name, ...classificationData }: CreateClassificationsDto) {
    try {
      const nameLower = name.toLocaleLowerCase();

      const existingClassificationName = await this.classificationsRepository.findByName(name);

      if (existingClassificationName) {
        throw new Error('Já existe uma Classificação com este nome');
      }

      const newClassification = this.classificationsRepository.create({
        name: nameLower,
        ...classificationData,
      });

      return newClassification;
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar a Classificação, ') + error.message;
    }
  }

  async update(id: number, { name, ...classificationData }: UpdateClassificationsDto) {
    try {
      const classification = await this.classificationsRepository.findById(id);
      const nameLower = name.toLocaleLowerCase();

      if (!classification) {
        throw new NotFoundException(`Classificação ${id} não foi encontrada`);
      }

      const existingClassificationName = await this.classificationsRepository.findByName(name);

      if (existingClassificationName) {
        throw new Error('Já existe uma Classificação com este nome');
      }

      const updateClassification = await this.classificationsRepository.update(id, {
        name: nameLower,
        ...classificationData,
      });

      return updateClassification;
    } catch (error) {
      throw new Error('Ocorreu um erro ao atualizar a Classificação, ') + error.message;
    }
  }

  async remove(id: number) {
    try {
      const classification = await this.classificationsRepository.findById(id);

      if (!classification) {
        throw new NotFoundException('Classificação não encontrada');
      }

      await this.classificationsRepository.delete(id);
    } catch (error) {
      throw new Error('Ocorreu um erro ao deletar a Classificação, ') + error.message;
    }
  }
}
