import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animes } from '../entities/animes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnimesService {
  constructor(
    @InjectRepository(Animes)
    private readonly animesRepository: Repository<Animes>,
  ) {}

  async findAll() {}

  async findByName() {}

  async findById() {}

  async create() {}

  async update() {}

  async delete() {}
}
