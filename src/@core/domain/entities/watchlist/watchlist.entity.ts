import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity('watchlist')
export class Watchlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  anime: string;

  @Column()
  thumbnailUrl: string;

  @Column()
  videoUrl: string;

  @Column()
  episodeId: number;

  @Column()
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Users, (user) => user.watchlist)
  users: Users;
}
