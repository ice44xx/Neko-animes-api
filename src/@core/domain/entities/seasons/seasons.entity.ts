import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Episodes } from '../episodes/episodes.entity';
import { Animes } from '../animes/animes.entity';

@Entity('Seasons')
export class Seasons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Episodes, (episode) => episode.season, { eager: true, cascade: true })
  episodes?: Episodes[];

  @ManyToOne(() => Animes, (anime) => anime.season)
  anime?: Animes;
}
