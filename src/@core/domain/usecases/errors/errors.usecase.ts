import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorsRepository } from '../../repositories/errors/errors.repository';
import { CreateErrorsDto } from 'src/@core/app/dto/errors/create-errors-dto';
import { ErrorsDto } from 'src/@core/app/dto/errors/errors-dto';

@Injectable()
export class ErrorsUseCase {
  constructor(private readonly errorsRepository: ErrorsRepository) {}

  async findAll() {
    const errors = await this.errorsRepository.findAll();
    return errors;
  }

  async findByError({ episodeId }: ErrorsDto) {
    const error = await this.errorsRepository.findByError(episodeId);

    if (!error) {
      throw new NotFoundException('Erro não encontrado');
    }

    return error;
  }

  async create({ anime, episodeId }: CreateErrorsDto) {
    const error = await this.errorsRepository.findByError(episodeId);

    if (error) {
      throw new ConflictException('Este erro do episódio já foi cadastrado');
    } else {
      const createError = await this.errorsRepository.create({ anime, episodeId });
      return createError;
    }
  }

  async remove({ episodeId }: ErrorsDto) {
    const error = await this.errorsRepository.findByError(episodeId);

    if (!error) {
      throw new NotFoundException('Erro não encontrado');
    }

    await this.errorsRepository.delete(episodeId);
  }
}
