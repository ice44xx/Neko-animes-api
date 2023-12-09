import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animes } from '../../../domain/entities/animes/animes.entity';
import { Repository, In, Like } from 'typeorm';
import { CreateAnimesDto } from '../../dto/requests/animes/create-animes-dto';
import { UpdateAnimesDto } from '../../dto/requests/animes/update-animes-dto';
import { Categories } from 'src/@core/domain/entities/categories/categories.entity';
import { LikesAnimes } from 'src/@core/domain/entities/likes-animes/likes-animes.entity';
import { Classifications } from 'src/@core/domain/entities/classifications/classifications.entity';

@Injectable()
export class AnimesService {
  constructor(
    @InjectRepository(Animes)
    private readonly animesRepository: Repository<Animes>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
    @InjectRepository(Classifications)
    private readonly classificationsRepository: Repository<Classifications>,
    @InjectRepository(LikesAnimes)
    private readonly likesRepository: Repository<LikesAnimes>,
  ) {}

  async findAll() {
    try {
      const animes = await this.animesRepository.find({
        relations: ['classifications', 'categories', 'season', 'likes'],
      });
      const animesWithLikes = await Promise.all(
        animes.map(async (anime) => {
          const likesCount = await this.likesRepository.count({
            where: { animes: { id: anime.id } },
          });
          return { ...anime, likes: likesCount };
        }),
      );
      return animesWithLikes;
    } catch (error) {
      throw new Error('Ocorreu um erro ao encontrar os animes') + error.message;
    }
  }

  async findByName(name: string) {
    try {
      const anime = await this.animesRepository.findOne({
        relations: ['categories'],
        where: { name: Like(`%${name.toLocaleLowerCase().trim()}%`) },
      });
      if (!anime) {
        throw new NotFoundException(`Anime ${name} não encontrado.`);
      }

      const likesCount = await this.likesRepository.count({
        where: { animes: { id: anime.id } },
      });

      return { ...anime, likes: likesCount };
    } catch (error) {
      throw new Error(`Ocorreu um erro ao encontrar o anime ${name}`) + error.message;
    }
  }

  async findById(id: number) {
    try {
      const anime = await this.animesRepository.findOne({
        relations: ['categories'],
        where: { id },
      });
      if (!anime) {
        throw new NotFoundException(`Anime ${id} não encontrado.`);
      }

      const likesCount = await this.likesRepository.count({
        where: { animes: { id: anime.id } },
      });

      return { ...anime, likes: likesCount };
    } catch (error) {
      throw new Error('Ocorreu um erro ao encontrar o id do anime') + error.message;
    }
  }

  async findLastReleases() {
    try {
      const animes = await this.animesRepository.find({
        order: { createdAt: 'DESC' },
        take: 10,
      });
      return animes;
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar os últimos lançamentos de animes');
    }
  }

  async create(createAnimesDto: CreateAnimesDto) {
    try {
      let { categoryName, classificationName, name, ...animeData } = createAnimesDto;

      categoryName = categoryName.map((name) => name.toLocaleLowerCase());
      const nameLowerCase = name.toLocaleLowerCase().trim();
      const classificationNameLowerCase = classificationName.toLowerCase();

      const categories = await this.categoriesRepository.find({
        where: { name: In(categoryName) },
      });

      const classification = await this.classificationsRepository.findOne({
        where: { name: classificationNameLowerCase },
      });

      if (!classification) {
        throw new BadRequestException('Esta classificação não existe');
      }

      if (categories.length !== categoryName.length) {
        throw new BadRequestException('Algumas categorias fornecidas não existem.');
      }

      const anime = this.animesRepository.create({
        name: nameLowerCase,
        classifications: classification,
        ...animeData,
      });

      anime.categories = categories;

      return await this.animesRepository.save(anime);
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar o anime') + error.message;
    }
  }

  async update(id: number, updateAnimesDto: UpdateAnimesDto) {
    try {
      let { categoryName, classificationName, name, ...animeData } = updateAnimesDto;

      categoryName = categoryName.map((name) => name.toLocaleLowerCase());
      const nameLowerCase = name.toLocaleLowerCase().trim();
      const classificationNameLowerCase = classificationName.toLowerCase();

      const anime = await this.animesRepository.findOne({
        where: { id },
      });

      if (!anime) {
        throw new NotFoundException(`Anime ${id} não encontrado.`);
      }

      const classification = await this.classificationsRepository.findOne({
        where: { name: classificationNameLowerCase },
      });

      if (!classification) {
        throw new BadRequestException('Esta classificação não existe');
      }

      const categories = await this.categoriesRepository.find({
        where: { name: In(categoryName) },
      });

      if (categories.length !== categoryName.length) {
        throw new BadRequestException('Algumas categorias fornecidas não existem.');
      }

      const animeUpdate = await this.animesRepository.merge(anime, {
        name: nameLowerCase,
        classifications: classification,
        categories: categories,
        ...animeData,
      });

      return this.animesRepository.save(animeUpdate);
    } catch (error) {
      throw new Error('Ocorreu um erro ao atualizar o anime') + error.message;
    }
  }

  async delete(id: number) {
    try {
      const anime = await this.animesRepository.findOne({
        where: { id },
      });
      if (!anime) {
        throw new NotFoundException(`Anime ${id} não encontrado.`);
      }
      await this.animesRepository.remove(anime);
    } catch (error) {
      throw new Error('Ocorreu um erro ao deletar o anime') + error.message;
    }
  }
}
