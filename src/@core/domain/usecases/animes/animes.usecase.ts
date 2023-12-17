import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimesDto } from 'src/@core/app/dto/animes/create-animes-dto';
import { UpdateAnimesDto } from 'src/@core/app/dto/animes/update-animes-dto';
import { AnimesRepository } from 'src/@core/domain/repositories/animes/animes.repository';
import { CategoriesRepository } from '../../repositories/categories/categories.repository';
import { ClassificationsRepository } from '../../repositories/classifications/classifications.repository';

@Injectable()
export class AnimesUseCase {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly classificationsRepository: ClassificationsRepository,
    private readonly animesRepository: AnimesRepository,
  ) {}

  async findAll() {
    try {
      const animes = await this.animesRepository.findAll();
      return animes;
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar os animes, ' + error.message);
    }
  }

  async findByName(name: string) {
    const anime = await this.animesRepository.findByName(name);

    if (!anime) {
      throw new NotFoundException(`Anime ${name} não encontrado`);
    }

    return anime;
  }

  async findById(id: number) {
    const anime = await this.animesRepository.findById(id);

    if (!anime) {
      throw new NotFoundException(`Anime ${id} não encontrado`);
    }

    return anime;
  }

  async create(createAnimesDto: CreateAnimesDto) {
    const { classificationName, categoryNames, ...animeData } = createAnimesDto;
    const classification = await this.classificationsRepository.findByName(classificationName);

    if (!classification) {
      throw new NotFoundException('Esta classificação não existe');
    }

    const categories = await this.categoriesRepository.findManyByNames(categoryNames);

    if (categories.length !== categoryNames.length) {
      throw new Error('Uma ou mais categorias não foram encontradas');
    }

    const anime = await this.animesRepository.create({
      ...animeData,
      classifications: {
        connect: { name: classificationName },
      },
      categories: {
        connect: categories.map((category) => ({ name: category.name })),
      },
    });

    return anime;
  }

  async update(id: number, updateAnimesDto: UpdateAnimesDto) {
    const { classificationName, categoryNames, ...animeData } = updateAnimesDto;

    const existingAnime = await this.animesRepository.findById(id);

    if (!existingAnime) {
      throw new NotFoundException(`O anime com ID ${id} não foi encontrado`);
    }

    const classification = await this.classificationsRepository.findByName(classificationName);

    if (!classification) {
      throw new NotFoundException('Esta classificação não existe');
    }

    const categories = await this.categoriesRepository.findManyByNames(categoryNames);

    if (categories.length !== categoryNames.length) {
      throw new Error('Uma ou mais categorias não foram encontradas');
    }

    const animeUpdate = await this.animesRepository.update(id, {
      ...animeData,
      classifications: {
        connect: { name: classificationName },
      },
      categories: {
        set: categories.map((category) => ({ name: category.name })),
      },
    });

    return {
      id: animeUpdate.id,
      name: animeUpdate.name,
      synopsis: animeUpdate.synopsis,
      thumbnailUrl: animeUpdate.thumbnailUrl,
      feature: animeUpdate.feature,
      classification: classificationName,
      categories: categoryNames,
    };
  }

  async remove(id: number) {
    const anime = await this.animesRepository.findById(id);

    if (!anime) {
      throw new NotFoundException(`Anime ${id} não encontrado`);
    }

    await this.animesRepository.delete(id);
  }
}
