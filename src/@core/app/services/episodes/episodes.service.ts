import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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
    const episodes = await this.episodesRepository
      .createQueryBuilder('episode')
      .select([
        'episode.id AS id',
        'episode.name AS name',
        'episode.url AS url',
        'episode.episodeOrder AS episodeOrder',
        'season.name AS season',
      ])
      .leftJoin('episode.season', 'season')
      .getRawMany();
    return episodes;
  }

  async findByName(name: string) {
    const episode = await this.episodesRepository.findOne({
      where: { name: Like(`%${name.toLocaleLowerCase().trim()}%`) },
    });
    if (!episode) {
      throw new NotFoundException(`Episódio ${name} não encontrado`);
    }
    return episode;
  }

  async create(createEpisodesDto: CreateEpisodesDto) {
    const { seasonId, name, episodeOrder, url } = createEpisodesDto;

    const season = await this.seasonsRepository.findOne({
      where: { id: seasonId },
    });

    if (!season) {
      throw new NotFoundException(`Temporada ${seasonId} não encontrada`);
    }

    const nameLowerCase = name.toLocaleLowerCase().trim();

    const newEpisode = this.episodesRepository.create({
      name: nameLowerCase,
      episodeOrder,
      url,
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

    const { seasonId, name, ...otherFields } = updateEpisodesDto;

    const nameLowerCase = name ? name.toLocaleLowerCase().trim() : undefined;

    const season = await this.seasonsRepository.findOne({ where: { id: seasonId } });

    if (!season) {
      throw new NotFoundException(`Temporada ${seasonId} não encontrada`);
    }

    episode.season = season;

    if (nameLowerCase) {
      episode.name = nameLowerCase;
    }

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
