import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episodes } from '../../../domain/entities/episodes/episodes.entity';
import { CreateEpisodesDto } from '../../dto/requests/episodes/create-episodes-dto';
import { Seasons } from 'src/@core/domain/entities/seasons/seasons.entity';
import { UpdateEpisodesDto } from '../../dto/requests/episodes/update-episodes-dto';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episodes)
    private readonly episodesRepository: Repository<Episodes>,
    @InjectRepository(Seasons)
    private readonly seasonsRepository: Repository<Seasons>,
  ) {}

  async findAll() {
    const episodes = await this.episodesRepository.find({ relations: ['season'] });
    return episodes;
  }

  async create(createEpisodesDto: CreateEpisodesDto) {
    const { seasonId, ...episodeData } = createEpisodesDto;

    const season = await this.seasonsRepository.findOne({
      where: { id: seasonId },
    });

    if (!season) {
      throw new NotFoundException(`Temporada ${seasonId} não encontrada`);
    }

    const newEpisode = this.episodesRepository.create({
      ...episodeData,
      season,
    });

    const create = await this.episodesRepository.save(newEpisode);
    return create;
  }

  async update(id: number, updateEpisodesDto: UpdateEpisodesDto) {
    const episode = await this.episodesRepository.findOne({
      relations: ['season'],
      where: { id },
    });

    if (!episode) {
      throw new NotFoundException(`Episódio ${id} não encontrado`);
    }

    const { seasonId, ...otherFields } = updateEpisodesDto;

    const season = await this.seasonsRepository.findOne({ where: { id: seasonId } });

    if (!season) {
      throw new NotFoundException(`Temporada ${seasonId} não encontrada`);
    }

    episode.season = season;

    if (otherFields) {
      Object.assign(episode, otherFields);
    }

    const updateEpisode = await this.episodesRepository.save(episode);
    return updateEpisode;
  }

  async delete(id: number) {
    const episode = await this.episodesRepository.findOne({ where: { id } });
    if (!episode) {
      throw new NotFoundException(`Episódio ${id} não encontrado`);
    }
    await this.episodesRepository.delete(episode);
  }
}
