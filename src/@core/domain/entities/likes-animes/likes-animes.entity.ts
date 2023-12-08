import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from '../users/users.entity';
import { Animes } from '../animes/animes.entity';

@Entity('likes-animes')
export class LikesAnimes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Animes, (anime) => anime.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  animes: Animes;

  @ManyToOne(() => Users, (user) => user.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: Users;
}
