import { Injectable } from '@nestjs/common';
import { ErrorsDto } from '../../dto/errors/errors-dto';
import { ErrorsUseCase } from 'src/@core/domain/usecases/errors/errors.usecase';
import { CreateErrorsDto } from '../../dto/errors/create-errors-dto';

@Injectable()
export class ErrorsServices {
  constructor(private readonly errorsUseCase: ErrorsUseCase) {}

  async findAll() {
    return await this.errorsUseCase.findAll();
  }

  async findByError({ episodeId }: ErrorsDto) {
    return await this.errorsUseCase.findByError({ episodeId });
  }

  async create(createErrorsDto: CreateErrorsDto) {
    return await this.errorsUseCase.create(createErrorsDto);
  }

  async remove({ episodeId }: ErrorsDto) {
    return await this.errorsUseCase.remove({ episodeId });
  }
}
