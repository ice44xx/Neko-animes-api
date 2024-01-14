import { Injectable, NotFoundException } from '@nestjs/common';
import { CodesRepository } from '../../repositories/codes/codes.repository';
import { CodesDto } from 'src/@core/app/dto/codes/code-dto';

@Injectable()
export class CodesUseCase {
  constructor(private readonly codesRepository: CodesRepository) {}

  async findAll() {
    const codes = await this.codesRepository.findAll();
    return codes;
  }

  async findByCode({ code }: CodesDto) {
    const codes = await this.codesRepository.findByCode(code);

    if (!codes || codes.length === 0) {
      throw new NotFoundException('Código expirado');
    }

    return codes;
  }

  async create({ code }: CodesDto) {
    const newCode = await this.codesRepository.create({ code });
    return newCode;
  }

  async deleteAfterDelay(id: number, delayMillis: number) {
    setTimeout(async () => {
      await this.codesRepository.delete(id);
    }, delayMillis);
  }
}
