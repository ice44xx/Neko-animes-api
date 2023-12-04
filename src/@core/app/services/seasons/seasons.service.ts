import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seasons } from '../../../domain/entities/seasons/seasons.entity';
import { CreateSeasonsDto } from '../../dto/requests/seasons/create-seasons-dto';
import { Like } from 'typeorm';
import { UpdateSeasonsDto } from '../../dto/requests/seasons/update-seasons-dto';

@Injectable()
export class SeasonsService {
  constructor(
    @InjectRepository(Seasons)
    private readonly seasonsRepository: Repository<Seasons>,
  ) {}

  async findAll() {
    const seasons = await this.seasonsRepository.find();
    return seasons;
  }

  async findByName(name: string) {
    const seasons = await this.seasonsRepository.findOne({
      where: { name: Like(`%${name.toLocaleLowerCase().trim()}`) },
    });
    if (!seasons) {
      throw new NotFoundException(`Temporada ${name} não encontrada`);
    }

    return seasons;
  }

  async create(createSeasonsDto: CreateSeasonsDto): Promise<Seasons> {
    const { name } = createSeasonsDto;
    const nameLowerCase = name.toLocaleLowerCase();
    const newSeason = this.seasonsRepository.create({ name: nameLowerCase });

    return await this.seasonsRepository.save(newSeason);
  }

  async update(id: number, updateSeasonsDto: UpdateSeasonsDto) {
    const season = await this.seasonsRepository.findOne({
      where: { id },
    });

    if (!season) {
      throw new NotFoundException(`Temporada ${id} não encontrada`);
    }

    season.name = updateSeasonsDto.name.toLocaleLowerCase();
    const update = await this.seasonsRepository.save(season);
    return update;
  }

  async delete(id: number) {
    const season = await this.seasonsRepository.delete(id);
    return season;
  }
}
