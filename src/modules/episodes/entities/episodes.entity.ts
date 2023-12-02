import { Seasons } from 'src/modules/seasons/entities/seasons.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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
