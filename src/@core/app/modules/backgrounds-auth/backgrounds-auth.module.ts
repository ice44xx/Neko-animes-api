import { Module } from '@nestjs/common';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { BackgroundsAuthRepository } from 'src/@core/domain/repositories/backgrounds-auth/backgrounds-auth.repository';
import { BackgroundsAuthUseCase } from 'src/@core/domain/usecases/backgrounds-auth/backgrounds-auth.usecase';
import { BackgroundsAuthService } from '../../services/backgrounds-auth/backgrounds-auth.service';
import { BackgroundsAuthController } from '../../controller/backgrounds-auth/backgrounds-auth.controller';

@Module({
  controllers: [BackgroundsAuthController],
  providers: [PrismaService, BackgroundsAuthRepository, BackgroundsAuthUseCase, BackgroundsAuthService],
})
export class BackgroundsAuthModule {}
