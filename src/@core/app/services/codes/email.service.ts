import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersRepository } from 'src/@core/domain/repositories/users/users.repository';

@Injectable()
export class EmailUseCase {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userRepository: UsersRepository,
  ) {}

  async sendCode(email: string, code: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('E-mail inválido');
    }

    await this.mailerService.sendMail({
      to: email,
      subject: 'Redefinição de senha',
      text: `Seu código de redefinição de senha é: ${code}`,
    });
  }
}
