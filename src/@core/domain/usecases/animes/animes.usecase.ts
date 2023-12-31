import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimesDto } from 'src/@core/app/dto/animes/create-animes-dto';
import { UpdateAnimesDto } from 'src/@core/app/dto/animes/update-animes-dto';
import { AnimesRepository } from 'src/@core/domain/repositories/animes/animes.repository';
import { CategoriesRepository } from '../../repositories/categories/categories.repository';
import { ClassificationsRepository } from '../../repositories/classifications/classifications.repository';
import { AnimesDto } from 'src/@core/app/dto/animes/animes-dto';

@Injectable()
export class AnimesUseCase {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly classificationsRepository: ClassificationsRepository,
    private readonly animesRepository: AnimesRepository,
  ) {}

  async findAll() {
    return await this.animesRepository.findAll();
  }

  async findAllFeature() {
    return await this.animesRepository.findAllFeature();
  }

  async findTopLikes() {
    return await this.animesRepository.findTopLikes();
  }

  async findByName({ name }: AnimesDto) {
    const anime = await this.animesRepository.findByName(name);

    if (!anime) {
      throw new NotFoundException(`Anime ${name} não encontrado`);
    }

    return anime;
  }

  async findById({ id }: AnimesDto) {
    const anime = await this.animesRepository.findById(id);

    if (!anime) {
      throw new NotFoundException(`Anime ${id} não encontrado`);
    }

    return anime;
  }

  async create(createAnimesDto: CreateAnimesDto) {
    const { classificationName, categoryNames, name, ...animeData } = createAnimesDto;
    const classification = await this.classificationsRepository.findByName(classificationName);
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    if (!classification) {
      throw new NotFoundException('Esta classificação não existe');
    }

    const categories = await this.categoriesRepository.findManyByNames(categoryNames);

    if (categories.length !== categoryNames.length) {
      throw new Error('Uma ou mais categorias não foram encontradas');
    }

    const anime = await this.animesRepository.create({
      ...animeData,
      name: formattedName,
      classifications: {
        connect: { name: classificationName },
      },
      categories: {
        connect: categories.map((category) => ({ name: category.name })),
      },
    });

    return {
      id: anime.id,
      name: formattedName,
      thumbnailUrl: anime.thumbnailUrl,
      feature: anime.feature,
      classification: classificationName,
      categories: categoryNames,
      createdAt: anime.createdAt,
    };
  }

  async update(animeId: number, updateAnimesDto: UpdateAnimesDto) {
    const { classificationName, categoryNames, name, ...animeData } = updateAnimesDto;
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    const existingAnime = await this.animesRepository.findById(animeId);

    if (!existingAnime) {
      throw new NotFoundException(`O anime com ID ${animeId} não foi encontrado`);
    }

    const classification = await this.classificationsRepository.findByName(classificationName);

    if (!classification) {
      throw new NotFoundException('Esta classificação não existe');
    }

    const categories = await this.categoriesRepository.findManyByNames(categoryNames);

    if (categories.length !== categoryNames.length) {
      throw new Error('Uma ou mais categorias não foram encontradas');
    }

    const animeUpdate = await this.animesRepository.update(animeId, {
      ...animeData,
      name: formattedName,
      classifications: {
        connect: { name: classificationName },
      },
      categories: {
        set: categories.map((category) => ({ name: category.name })),
      },
    });

    return {
      id: animeUpdate.id,
      name: formattedName,
      synopsis: animeUpdate.synopsis,
      thumbnailUrl: animeUpdate.thumbnailUrl,
      feature: animeUpdate.feature,
      classification: classificationName,
      categories: categoryNames,
    };
  }

  async remove({ id }: AnimesDto) {
    const anime = await this.animesRepository.findById(id);

    if (!anime) {
      throw new NotFoundException(`Anime ${id} não encontrado`);
    }

    await this.animesRepository.delete(id);
  }
}
