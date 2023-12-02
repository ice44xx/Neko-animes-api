import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episodes } from '../entities/episodes.entity';
import { CreateEpisodesDto } from '../dtos/create-episodes-dto';
import { Seasons } from 'src/modules/seasons/entities/seasons.entity';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episodes)
    private readonly episodesRepository: Repository<Episodes>,
    @InjectRepository(Seasons)
    private readonly seasonsRepository: Repository<Seasons>,
  ) {}

  async create(createEpisodesDto: CreateEpisodesDto) {}
}
