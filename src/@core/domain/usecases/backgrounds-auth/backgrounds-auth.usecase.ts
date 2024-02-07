import { Injectable, NotFoundException } from '@nestjs/common';
import { BackgroundsAuthRepository } from '../../repositories/backgrounds-auth/backgrounds-auth.repository';
import { CreateBackgroundsAuthDto } from 'src/@core/app/dto/backgrounds-auth/create-backgrounds-dtos';
import { UpdateBackgroundsAuthDto } from 'src/@core/app/dto/backgrounds-auth/update-backgrounds-dto';
import { BackgroundsAuthDto } from 'src/@core/app/dto/backgrounds-auth/backgrounds-auth-dtos';

@Injectable()
export class BackgroundsAuthUseCase {
  constructor(private readonly backgroundsAuthRepository: BackgroundsAuthRepository) {}

  async findAll() {
    const backgroundsAuth = await this.backgroundsAuthRepository.findAll();

    if (backgroundsAuth.length === 0) {
      throw new NotFoundException('Array de backgrounds vazio');
    }

    return backgroundsAuth;
  }

  async findById({ id }: BackgroundsAuthDto) {
    const background = await this.backgroundsAuthRepository.findById(id);

    if (!background) {
      throw new NotFoundException(`Background ${id} não encontrado`);
    }

    return background;
  }

  async create(createBackgroundsDto: CreateBackgroundsAuthDto) {
    return await this.backgroundsAuthRepository.create(createBackgroundsDto);
  }

  async update(id: number, updateBackgroundsDto: UpdateBackgroundsAuthDto) {
    const backgroundAuth = await this.backgroundsAuthRepository.findById(id);

    if (!backgroundAuth) {
      throw new NotFoundException('Background não encontrado');
    }

    const updateBackgroundAuth = await this.backgroundsAuthRepository.update(id, updateBackgroundsDto);

    return updateBackgroundAuth;
  }

  async remove({ id }: BackgroundsAuthDto) {
    const backgroundAuth = await this.backgroundsAuthRepository.findById(id);

    if (!backgroundAuth) {
      throw new NotFoundException('Background não encontrado');
    }

    await this.backgroundsAuthRepository.delete(id);
  }
}
