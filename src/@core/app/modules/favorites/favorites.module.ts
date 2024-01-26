import { Module } from '@nestjs/common';
import { FavoritesController } from '../../controller/favorites/favorites.controller';
import { PrismaService } from 'src/@core/infra/database/prisma/prisma.service';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { FavoritesRepository } from 'src/@core/domain/repositories/favorites/favorites.repository';
import { FavoritesUseCase } from 'src/@core/domain/usecases/favorites/favorites.usecase';
import { UsersRepository } from 'src/@core/domain/repositories/users/users.repository';
import { AnimesRepository } from 'src/@core/domain/repositories/animes/animes.repository';

@Module({
  controllers: [FavoritesController],
  providers: [PrismaService, FavoritesService, FavoritesRepository, FavoritesUseCase, UsersRepository, AnimesRepository],
})
export class FavoritesModule {}
