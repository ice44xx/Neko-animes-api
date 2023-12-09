import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Categories } from '../categories/categories.entity';
import { Seasons } from '../seasons/seasons.entity';
import { LikesAnimes } from '../likes-animes/likes-animes.entity';
import { Favorites } from '../favorites/favorites.entity';
import { Classifications } from '../classifications/classifications.entity';

@Entity('animes')
export class Animes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  synopsis: string;

  @Column()
  thumbnailUrl: string;

  @Column()
  feature: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Categories, (category) => category.animes, {
    cascade: true,
  })
  categories: Categories[];

  @OneToMany(() => Seasons, (season) => season.anime, { eager: true, cascade: true })
  season: Seasons[];

  @OneToMany(() => LikesAnimes, (like) => like.animes, { cascade: true })
  likes: LikesAnimes[];

  @OneToMany(() => Favorites, (favorites) => favorites.animes, { cascade: true })
  favorites: Favorites[];

  @ManyToOne(() => Classifications, (classification) => classification.animes, {
    cascade: true,
  })
  classifications: Classifications;
}
