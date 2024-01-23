import { Injectable } from '@nestjs/common';
import { CreateSeasonsDto } from '../../dto/seasons/create-seasons-dto';
import { SeasonsUseCase } from 'src/@core/domain/usecases/seasons/seasons.usecase';
import { SeasonsDto } from '../../dto/seasons/seasonsDto';
import { UpdateSeasonsDto } from '../../dto/seasons/update-seasons-dto';

@Injectable()
export class SeasonsService {
  constructor(private readonly seasonsUseCase: SeasonsUseCase) {}

  async findAll() {
    return this.seasonsUseCase.findAll();
  }

  async findByName({ name }: SeasonsDto) {
    return this.seasonsUseCase.findByName({ name });
  }

  async findById({ id }: SeasonsDto) {
    return this.seasonsUseCase.findById({ id });
  }

  async create(createSeasonsDto: CreateSeasonsDto) {
    return this.seasonsUseCase.create(createSeasonsDto);
  }

  async update(seasonId: number, updateUsersDto: UpdateSeasonsDto) {
    return this.seasonsUseCase.update(seasonId, updateUsersDto);
  }

  async remove({ id }: SeasonsDto) {
    return this.seasonsUseCase.remove({ id });
  }
}
