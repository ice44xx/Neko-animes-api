import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SeasonsRepository } from '../../repositories/seasons/seasons.repository';
import { AnimesRepository } from '../../repositories/animes/animes.repository';
import { CreateSeasonsDto } from 'src/@core/app/dto/seasons/create-seasons-dto';
import { UpdateSeasonsDto } from 'src/@core/app/dto/seasons/update-seasons-dto';
import { SeasonsDto } from 'src/@core/app/dto/seasons/seasonsDto';

@Injectable()
export class SeasonsUseCase {
  constructor(
    private readonly seasonsRepository: SeasonsRepository,
    private readonly animesRepository: AnimesRepository,
  ) {}

  async findAll() {
    return this.seasonsRepository.findAll();
  }

  async findByName({ name }: SeasonsDto) {
    return this.seasonsRepository.findByName(name);
  }

  async create({ name, animeId, order }: CreateSeasonsDto) {
    const nameLower = name.toLocaleLowerCase();

    const existingSeasons = await this.seasonsRepository.findByFirst(animeId, name);

    if (existingSeasons) {
      throw new ConflictException('Já existe uma temporada com este nome');
    }

    const existingAnime = await this.animesRepository.findById(animeId);

    if (!existingAnime) {
      throw new NotFoundException('Anime não encontrado');
    }

    const newSeason = await this.seasonsRepository.create({
      name: nameLower,
      order: order,
      anime: { connect: { id: animeId } },
    });

    return newSeason;
  }

  async update(seasonId: number, updateSeasonsDto: UpdateSeasonsDto) {
    const season = await this.seasonsRepository.findById(seasonId);

    if (!season) {
      throw new NotFoundException('Temporada não encontrada');
    }

    const seasonUpdate = await this.seasonsRepository.update(seasonId, updateSeasonsDto);

    return seasonUpdate;
  }

  async remove({ id }: SeasonsDto) {
    const season = await this.seasonsRepository.findById(id);

    if (!season) {
      throw new NotFoundException('Temporada não encontrada');
    }

    return this.seasonsRepository.remove(id);
  }
}
