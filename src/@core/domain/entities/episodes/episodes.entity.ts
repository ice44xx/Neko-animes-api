import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Seasons } from '../seasons/seasons.entity';
import { Likes } from '../likes/likes.entity';

@Entity('episodes')
export class Episodes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  episodeOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Seasons, (season) => season.episodes)
  season: Seasons;

  @OneToMany(() => Likes, (like) => like.episodes)
  likes: Likes[];
}
