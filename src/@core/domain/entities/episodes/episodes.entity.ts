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
import { LikesEpisodes } from '../likes-episodes/likes-episodes.entity';
import { Comments } from '../comments/comments.entity';

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

  @OneToMany(() => LikesEpisodes, (like) => like.episodes)
  likes: LikesEpisodes[];

  @OneToMany(() => Comments, (comments) => comments.episodes)
  comments: Comments[];
}
