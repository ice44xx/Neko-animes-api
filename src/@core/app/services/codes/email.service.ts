import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailUseCase {
  constructor(private readonly mailerService: MailerService) {}

  async sendCode(email: string, code: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Redefinição de senha',
      text: `Seu código de redefinição de senha é: ${code}`,
    });
  }
}
