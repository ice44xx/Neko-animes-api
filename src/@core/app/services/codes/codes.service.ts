import { Injectable } from '@nestjs/common';
import { CodesUseCase } from 'src/@core/domain/usecases/codes/codes.usecase';
import { CodesDto } from '../../dto/codes/code-dto';
import { EmailUseCase } from './email.service';

@Injectable()
export class CodesServices {
  constructor(
    private readonly codesUseCase: CodesUseCase,
    private readonly emailUseCase: EmailUseCase,
  ) {}

  async findAll() {
    return await this.codesUseCase.findAll();
  }

  async findByCode({ code }: CodesDto) {
    return await this.codesUseCase.findByCode({ code });
  }

  async create(createCodesDto: CodesDto) {
    return await this.codesUseCase.create(createCodesDto);
  }

  async sendResetCode(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000);

    const newCode = await this.codesUseCase.create({ code });
    await this.codesUseCase.deleteAfterDelay(newCode.id, 300000);

    await this.emailUseCase.sendCode(email, code.toString());
    return code;
  }

  async deleteAfterDelay(id: number, delayMillis: number) {
    await this.codesUseCase.deleteAfterDelay(id, delayMillis);
  }
}
