import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/@core/infra/auth/strategies/local.strategy';
import { JwtStrategy } from 'src/@core/infra/auth/strategies/jwt.strategy';
import { AuthController } from '../../controller/auth/auth.controller';
import { AuthServices } from '../../services/auth/auth.services';
import { EnvConfigModule } from 'src/@core/infra/env-config/env-config.module';
import { EnvConfigService } from 'src/@core/infra/env-config/env-config.service';

@Module({
  imports: [
    EnvConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: async (envConfigService: EnvConfigService) => ({
        secret: envConfigService.getJwtSecret(),
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  providers: [AuthServices, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
