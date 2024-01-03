import { Injectable } from '@nestjs/common';
import { BackgroundsDto } from '../../dto/backgrounds/backgrounds-dto';
import { BackgroundsAuthUseCase } from 'src/@core/domain/usecases/backgrounds-auth/backgrounds-auth.usecase';
import { CreateBackgroundsAuthDto } from '../../dto/backgrounds-auth/create-backgrounds-dtos';
import { UpdateBackgroundsAuthDto } from '../../dto/backgrounds-auth/update-backgrounds-dto';

@Injectable()
export class BackgroundsAuthService {
  constructor(private readonly backgroundAuthUseCase: BackgroundsAuthUseCase) {}

  async findAll() {
    return await this.backgroundAuthUseCase.findAll();
  }

  async create(createBackgroundsDto: CreateBackgroundsAuthDto) {
    return await this.backgroundAuthUseCase.create(createBackgroundsDto);
  }

  async update(id: number, updateBackgroundsDto: UpdateBackgroundsAuthDto) {
    return await this.backgroundAuthUseCase.update(id, updateBackgroundsDto);
  }

  async remove({ id }: BackgroundsDto) {
    return await this.backgroundAuthUseCase.remove({ id });
  }
}
