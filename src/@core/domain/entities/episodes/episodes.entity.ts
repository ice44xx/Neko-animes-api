import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Seasons } from '../seasons/seasons.entity';

@Entity('Episodes')
export class Episodes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  episodeOrder: number;

  @ManyToOne(() => Seasons, (season) => season.episodes)
  season: Seasons;
}
