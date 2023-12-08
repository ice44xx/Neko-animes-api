import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Episodes } from '../episodes/episodes.entity';
import { Users } from '../users/users.entity';

@Entity('likes')
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Episodes, (episode) => episode.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  episodes: Episodes;

  @ManyToOne(() => Users, (user) => user.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: Users;
}
