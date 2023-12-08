import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from '../users/users.entity';
import { Animes } from '../animes/animes.entity';

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.favorites)
  users: Users;

  @ManyToOne(() => Animes, (anime) => anime.favorites)
  animes: Animes;
}
