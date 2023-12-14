import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Episodes } from '../../../domain/entities/episodes/episodes.entity';
import { CreateEpisodesDto } from '../../dto/requests/episodes/create-episodes-dto';
import { Seasons } from 'src/@core/domain/entities/seasons/seasons.entity';
import { UpdateEpisodesDto } from '../../dto/requests/episodes/update-episodes-dto';
import { LikesEpisodes } from 'src/@core/domain/entities/likes-episodes/likes-episodes.entity';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episodes)
    private readonly episodesRepository: Repository<Episodes>,
    @InjectRepository(Seasons)
    private readonly seasonsRepository: Repository<Seasons>,
    @InjectRepository(LikesEpisodes)
    private readonly likesRepository: Repository<LikesEpisodes>,
  ) {}

  async findAll() {
    try {
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
        .orderBy('episode.episodeOrder', 'ASC')
        .getRawMany();

      const episodesWithLikes = await Promise.all(
        episodes.map(async (episode) => {
          const likesCount = await this.likesRepository.count({
            where: { episodes: { id: episode.id } },
          });
          return { ...episode, likes: likesCount };
        }),
      );
      return episodesWithLikes;
    } catch (error) {
      throw new Error('Ocorreu um erro ao encontrar todos episódios, ') + error.message;
    }
  }

  async findByName(name: string) {
    try {
      const episode = await this.episodesRepository.findOne({
        where: { name: Like(`%${name.toLocaleLowerCase().trim()}%`) },
      });
      if (!episode) {
        throw new NotFoundException(`Episódio ${name} não encontrado`);
      }
      return episode;
    } catch (error) {
      throw new Error(`Ocorreu um erro ao procurar o episódio ${name}, `) + error.message;
    }
  }

  async create(createEpisodesDto: CreateEpisodesDto) {
    try {
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
    } catch (error) {
      throw new Error('Ocorreu um erro ao criar o episódio, ') + error.message;
    }
  }

  async update(id: number, updateEpisodesDto: UpdateEpisodesDto) {
    try {
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
    } catch (error) {
      throw new Error('Ocorreu um erro ao atualizar o episódio, ') + error.message;
    }
  }

  async delete(id: number) {
    try {
      const episode = await this.episodesRepository.findOne({ where: { id } });
      if (!episode) {
        throw new NotFoundException(`Episódio ${id} não encontrado`);
      }
      await this.episodesRepository.delete(episode);
    } catch (error) {
      throw new Error('Ocorreu um erro ao deletar o episódio, ') + error.message;
    }
  }
}
