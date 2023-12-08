import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categories } from '../categories/categories.entity';
import { Seasons } from '../seasons/seasons.entity';
import { LikesAnimes } from '../likes-animes/likes-animes.entity';

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

  @OneToMany(() => Seasons, (season) => season.anime, { eager: true })
  season: Seasons[];

  @OneToMany(() => LikesAnimes, (like) => like.animes)
  likes: LikesAnimes[];
}
