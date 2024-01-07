import { Injectable } from '@nestjs/common';
import { EpisodesUseCase } from 'src/@core/domain/usecases/episodes/episodes.usecase';
import { EpisodesDto } from '../../dto/episodes/episodes-dto';
import { CreateEpisodesDto } from '../../dto/episodes/create-episodes-dto';
import { UpdateEpisodesDto } from '../../dto/episodes/update-episodes-dto';

@Injectable()
export class EpisodesService {
  constructor(private readonly episodesUseCase: EpisodesUseCase) {}

  async findAll() {
    return await this.episodesUseCase.findAll();
  }

  async findByAnimeName(name: string) {
    return await this.episodesUseCase.findByAnimeName(name);
  }

  async findByAnimeId(id: number) {
    return await this.episodesUseCase.findByAnimeId(id);
  }

  async findById({ id }: EpisodesDto) {
    return await this.episodesUseCase.findById({ id });
  }

  async create(createEpisodesDto: CreateEpisodesDto) {
    return await this.episodesUseCase.create(createEpisodesDto);
  }

  async update(episodeId: number, updateEpisodesDto: UpdateEpisodesDto) {
    return await this.episodesUseCase.update(episodeId, updateEpisodesDto);
  }

  async remove({ id }: EpisodesDto) {
    return await this.episodesUseCase.remove({ id });
  }
}
