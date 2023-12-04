import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episodes } from '../../../domain/entities/episodes/episodes.entity';
import { CreateEpisodesDto } from '../../dto/requests/episodes/create-episodes-dto';
import { Seasons } from 'src/@core/domain/entities/seasons/seasons.entity';

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
