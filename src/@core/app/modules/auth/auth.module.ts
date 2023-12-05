import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../../controller/auth/auth.controller';
import { AuthServices } from '../../services/auth/auth.service';
import { LocalStrategy } from 'src/@core/infra/auth/strategies/local.strategy';
import { JwtStrategy } from 'src/@core/infra/auth/strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthServices, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
