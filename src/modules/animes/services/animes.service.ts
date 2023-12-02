import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animes } from '../entities/animes.entity';
import { Repository, In } from 'typeorm';
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
      relations: ['categories'],
      where: { name },
    });
    if (!anime) {
      throw new NotFoundException(`Anime ${name} não encontrado.`);
    }
    return anime;
  }

  async findById(id: number) {
    const anime = await this.animesRepository.findOne({
      relations: ['categories'],
      where: { id },
    });
    if (!anime) {
      throw new NotFoundException(`Anime ${id} não encontrado.`);
    }
    return anime;
  }

  async create(createAnimesDto: CreateAnimesDto) {
    let { categoryName, ...otherData } = createAnimesDto;

    categoryName = categoryName.map((name) => name.toLocaleLowerCase());

    const categories = await this.categoriesRepository.find({
      where: { name: In(categoryName) },
    });

    if (categories.length !== categoryName.length) {
      throw new BadRequestException('Algumas categorias fornecidas não existem.');
    }

    const anime = this.animesRepository.create({ ...otherData });

    anime.categories = categories;

    return await this.animesRepository.save(anime);
  }

  async update(id: number, updateAnimesDto: UpdateAnimesDto) {
    let { categoryName, ...otherData } = updateAnimesDto;

    const anime = await this.animesRepository.findOne({
      where: { id },
    });
    if (!anime) {
      throw new NotFoundException(`Anime ${id} não encontrado.`);
    }

    categoryName = categoryName.map((name) => name.toLocaleLowerCase());

    const categories = await this.categoriesRepository.find({
      where: { name: In(categoryName) },
    });

    if (categories.length !== categoryName.length) {
      throw new BadRequestException('Algumas categorias fornecidas não existem.');
    }

    anime.categories = categories;
    Object.assign(anime, otherData);

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
