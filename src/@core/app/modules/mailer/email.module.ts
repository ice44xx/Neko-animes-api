import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'nekopageanimes@gmail.com',
          pass: 'wdvfgzpxvrdjucar',
        },
      },
      defaults: {
        from: 'Neko Animes <nekopageanimes@gmail.com>',
        to: '',
        subject: 'Redefinição de senha',
      },
    }),
  ],
  exports: [MailerModule],
})
export class EmailModule {}
