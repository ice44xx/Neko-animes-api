import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seasons } from '../../../domain/entities/seasons/seasons.entity';
import { CreateSeasonsDto } from '../../dto/requests/seasons/create-seasons-dto';
import { UpdateSeasonsDto } from '../../dto/requests/seasons/update-seasons-dto';
import { Animes } from 'src/@core/domain/entities/animes/animes.entity';

@Injectable()
export class SeasonsService {
  constructor(
    @InjectRepository(Seasons)
    private readonly seasonsRepository: Repository<Seasons>,
    @InjectRepository(Animes)
    private readonly animesRepository: Repository<Animes>,
  ) {}

  async findAll() {
    try {
      const seasons = await this.seasonsRepository
        .createQueryBuilder('season')
        .leftJoinAndSelect('season.episodes', 'episodes')
        .leftJoin('season.anime', 'anime')
        .select([
          'season.id',
          'season.name',
          'anime.name',
          'episodes.id',
          'episodes.name',
          'episodes.url',
        ])
        .getMany();
      return seasons;
    } catch (error) {
      throw new Error('Ocorreu um erro ao encontrar todas temporadas') + error.message;
    }
  }

  async findByName(name: string) {
    try {
      const seasons = await this.seasonsRepository
        .createQueryBuilder('season')
        .leftJoinAndSelect('season.episodes', 'episodes')
        .leftJoin('season.anime', 'anime')
        .select([
          'season.id',
          'season.name',
          'anime.name',
          'episodes.id',
          'episodes.name',
          'episodes.url',
        ])
        .where('LOWER(season.name) LIKE :name', {
          name: `%${name.toLowerCase().trim()}%`,
        })
        .getOne();
      if (!seasons) {
        throw new NotFoundException(`Temporada ${name} não encontrada`);
      }

      return seasons;
    } catch (error) {
      throw new Error(`Ocorreu um erro ao encontrar a temporada ${name}`);
    }
  }

  async create(createSeasonsDto: CreateSeasonsDto): Promise<Seasons> {
    try {
      const { name, animeId } = createSeasonsDto;

      const anime = await this.animesRepository.findOne({ where: { id: animeId } });

      if (!anime) {
        throw new NotFoundException(`Anime ${animeId} não encontrado`);
      }

      const nameLowerCase = name.toLocaleLowerCase().trim();
      const newSeason = this.seasonsRepository.create({ name: nameLowerCase, anime });

      return await this.seasonsRepository.save(newSeason);
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar a temporada') + error.message;
    }
  }

  async update(id: number, updateSeasonsDto: UpdateSeasonsDto) {
    try {
      const { name, animeId } = updateSeasonsDto;

      const season = await this.seasonsRepository.findOne({
        where: { id },
      });

      if (!season) {
        throw new NotFoundException(`Temporada ${id} não encontrada`);
      }

      const anime = await this.animesRepository.findOne({ where: { id: animeId } });

      if (!anime) {
        throw new NotFoundException(`Anime ${animeId} não encontrado`);
      }

      season.anime = anime;
      season.name = updateSeasonsDto.name.toLocaleLowerCase().trim();

      const update = await this.seasonsRepository.save(season);
      return update;
    } catch (error) {
      throw new Error('Ocorreu um erro ao atualizar a temporada') + error.message;
    }
  }

  async delete(id: number) {
    try {
      const season = await this.seasonsRepository.delete(id);
      return season;
    } catch (error) {
      throw new Error('Ocorreu um erro ao deletar a temporada') + error.message;
    }
  }
}
