import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Categories } from '../categories/categories.entity';
import { Seasons } from '../seasons/seasons.entity';

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

  @ManyToMany(() => Categories, (category) => category.animes, {
    cascade: true,
  })
  categories: Categories[];

  @OneToMany(() => Seasons, (season) => season.anime, { eager: true })
  season: Seasons[];
}
