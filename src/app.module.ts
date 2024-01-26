import { Module } from '@nestjs/common';
import { DatabaseModule } from './@core/infra/database/database.module';
import { RolesGuard } from './@core/infra/auth/guards/roles-auth.guard';
import { JwtAuthGuard } from './@core/infra/auth/guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { EnvConfigModule } from './@core/infra/env-config/env-config.module';

@Module({
  imports: [DatabaseModule, JwtModule, EnvConfigModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
