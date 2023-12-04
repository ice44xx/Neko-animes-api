import { Module } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/@core/domain/entities/users/users.entity';
import { Categories } from 'src/@core/domain/entities/categories/categories.entity';
import { Animes } from 'src/@core/domain/entities/animes/animes.entity';
import { Seasons } from 'src/@core/domain/entities/seasons/seasons.entity';
import { Episodes } from 'src/@core/domain/entities/episodes/episodes.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '020619',
  database: 'nekoanimes',
  entities: [Users, Categories, Animes, Seasons, Episodes],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
  exports: [],
})
export class DatabaseModule {}
