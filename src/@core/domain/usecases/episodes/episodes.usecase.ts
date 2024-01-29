import { Injectable, NotFoundException } from '@nestjs/common';
import { EpisodesRepository } from '../../repositories/episodes/episodes.repository';
import { SeasonsRepository } from '../../repositories/seasons/seasons.repository';
import { EpisodesDto } from 'src/@core/app/dto/episodes/episodes-dto';
import { CreateEpisodesDto } from 'src/@core/app/dto/episodes/create-episodes-dto';
import { UpdateEpisodesDto } from 'src/@core/app/dto/episodes/update-episodes-dto';

@Injectable()
export class EpisodesUseCase {
  constructor(
    private readonly episodesRepository: EpisodesRepository,
    private readonly seasonsRepository: SeasonsRepository,
  ) {}

  async findAll() {
    return await this.episodesRepository.findAll();
  }

  async findTop12Newest() {
    return await this.episodesRepository.findTop12Newest();
  }

  async findByAnimeName(name: string) {
    const episode = await this.episodesRepository.findByAnimeName(name);

    if (!episode || episode.length === 0) {
      throw new NotFoundException('Anime não encontrado');
    }
    return episode;
  }

  async findByAnimeId(id: number) {
    const episode = await this.episodesRepository.findByAnimeId(id);

    if (!episode || episode.length === 0) {
      throw new NotFoundException('Anime não encontrado');
    }
    return episode;
  }

  async findById({ id }: EpisodesDto) {
    const episode = await this.episodesRepository.findById(id);

    if (!episode) {
      throw new NotFoundException('Episódio não encontrado');
    }

    return episode;
  }

  async create({ name, seasonId, ...episodesData }: CreateEpisodesDto) {
    const nameLower = name.trim();

    const season = await this.seasonsRepository.findById(seasonId);

    if (!season) {
      throw new NotFoundException('Temporada não encontrada');
    }

    const newEpisodes = await this.episodesRepository.create({
      name: nameLower,
      ...episodesData,
      seasons: { connect: { id: seasonId } },
    });

    return newEpisodes;
  }

  async update(episodeId: number, { name, seasonId, ...episodesData }: UpdateEpisodesDto) {
    const nameLower = name.trim();

    const episode = await this.episodesRepository.findById(episodeId);

    if (!episode) {
      throw new NotFoundException('Episódio não encontrado');
    }

    const season = await this.seasonsRepository.findById(seasonId);

    if (!season) {
      throw new NotFoundException('Temporada não encontrada');
    }

    const episodeUpdate = await this.episodesRepository.update(episodeId, {
      name: nameLower,
      seasons: { connect: { id: seasonId } },
      ...episodesData,
    });

    return episodeUpdate;
  }

  async remove({ id }: EpisodesDto) {
    const episode = await this.episodesRepository.findById(id);

    if (!episode) {
      throw new NotFoundException('Episódio não encontrado');
    }

    return await this.episodesRepository.remove(id);
  }
}
