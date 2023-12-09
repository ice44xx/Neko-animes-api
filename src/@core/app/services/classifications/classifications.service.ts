import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classifications } from 'src/@core/domain/entities/classifications/classifications.entity';
import { Repository } from 'typeorm';
import { CreateClassificationsDto } from '../../dto/requests/classifications/create-classifications-dto';
import { UpdateClassificationsDto } from '../../dto/requests/classifications/update-classifications-dto';

@Injectable()
export class ClassificationsService {
  constructor(
    @InjectRepository(Classifications)
    private readonly classificationsRepository: Repository<Classifications>,
  ) {}

  async findAll() {
    try {
      const classifications = await this.classificationsRepository
        .createQueryBuilder('classifications')
        .leftJoinAndSelect('classifications.animes', 'anime')
        .select(['classifications.name', 'anime.id', 'anime.name'])
        .getMany();

      return classifications.map((classification) => ({
        name: classification.name,
        animes: classification.animes.map((anime) => ({
          id: anime.id,
          name: anime.name,
        })),
      }));
    } catch (error) {
      throw (
        new Error('Ocorreu um erro ao buscar todas as classificações') + error.message
      );
    }
  }

  async create(createClassificationsDto: CreateClassificationsDto) {
    try {
      const { name, ...classificationData } = createClassificationsDto;
      const classificationNameLowerCase = name.toLowerCase();

      const classification = this.classificationsRepository.create({
        name: classificationNameLowerCase,
        ...classificationData,
      });

      const save = await this.classificationsRepository.save(classification);
      return save;
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar a classificação') + error.message;
    }
  }

  async update(id: number, updateClassificationsDto: UpdateClassificationsDto) {
    try {
      const { name, ...classificationData } = updateClassificationsDto;
      const classificationNameLowerCase = name.toLowerCase();

      const classification = await this.classificationsRepository.findOne({
        where: { id },
      });

      if (!classification) {
        throw new NotFoundException('Classificação não encontrada');
      }

      this.classificationsRepository.merge(classification, {
        name: classificationNameLowerCase,
        ...classificationData,
      });

      const update = await this.classificationsRepository.save(classification);
      return update;
    } catch (error) {
      throw new Error('Ocorreu um erro ao atualizar a classificação') + error.message;
    }
  }

  async delete(id: number) {
    try {
      const classification = await this.classificationsRepository.findOne({
        where: { id },
      });

      if (!classification) {
        throw new NotFoundException('Classificação não encontrada');
      }

      await this.classificationsRepository.delete(classification);
    } catch (error) {
      throw new Error('Ocorreu um erro ao excluir classificação') + error.message;
    }
  }
}
