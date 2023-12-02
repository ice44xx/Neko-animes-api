import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animes } from '../entities/animes.entity';
import { Repository } from 'typeorm';
import { CreateAnimesDto } from '../dtos/create-animes-dto';
import { UpdateAnimesDto } from '../dtos/update-animes-dto';
import { Categories } from 'src/modules/categories/entities/categories.entity';

@Injectable()
export class AnimesService {
  constructor(
    @InjectRepository(Animes)
    private readonly animesRepository: Repository<Animes>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async findAll() {
    const anime = await this.animesRepository.find({ relations: ['categories'] });
    return anime;
  }

  async findByName(name: string) {
    const anime = await this.animesRepository.findOne({
      where: { name },
    });
    if (!anime) {
      throw new NotFoundException(`Anime ${name} não encontrado.`);
    }
    return anime;
  }

  async findById(id: number) {
    const anime = await this.animesRepository.findOne({
      where: { id },
    });
    if (!anime) {
      throw new NotFoundException(`Anime ${id} não encontrado.`);
    }
    return anime;
  }

  async create(createAnimesDto: CreateAnimesDto) {
    const { name, categoryName, ...otherAnimeData } = createAnimesDto;

    let category = await this.categoriesRepository.findOne({
      where: { name: categoryName },
    });
    if (!category) {
      category = this.categoriesRepository.create({ name: categoryName });
    }

    const anime = this.animesRepository.create({
      name,
      categories: [category],
      ...otherAnimeData,
    });

    const savedAnime = await this.animesRepository.save(anime);

    return savedAnime;
  }

  async update(id: number, updateAnimesDto: UpdateAnimesDto) {
    const { categoryName, ...otherAnimeData } = updateAnimesDto;
    const anime = await this.animesRepository.findOne({
      where: { id },
    });
    if (!anime) {
      throw new NotFoundException(`Anime ${id} não encontrado.`);
    }

    const category = await this.categoriesRepository.findOne({
      where: { name: categoryName },
    });

    if (!category) {
      throw new NotFoundException(
        `Categoria ${updateAnimesDto.categoryName} não encontrada.`,
      );
    }

    anime.categories = [category];

    Object.assign(anime, otherAnimeData);
    return this.animesRepository.save(anime);
  }

  async delete(id: number) {
    const anime = await this.animesRepository.findOne({
      where: { id },
    });
    if (!anime) {
      throw new NotFoundException(`Anime ${id} não encontrado.`);
    }
    await this.animesRepository.remove(anime);
  }
}
