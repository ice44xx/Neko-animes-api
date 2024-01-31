import { Injectable } from '@nestjs/common';
import { ResponsesUseCase } from 'src/@core/domain/usecases/comments/responses.usecase';
import { CreateResponsesDto } from '../../dto/comments/create-responses-dto';
import { ResponsesDto } from '../../dto/comments/responses-dto';

@Injectable()
export class ResponsesService {
  constructor(private readonly responsesUseCase: ResponsesUseCase) {}

  async create(userId: number, createResponsesDto: CreateResponsesDto) {
    return await this.responsesUseCase.create(userId, createResponsesDto);
  }

  async remove(responsesDto: ResponsesDto) {
    return await this.responsesUseCase.remove(responsesDto);
  }
}
