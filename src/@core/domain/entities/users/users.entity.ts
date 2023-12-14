import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { LikesEpisodes } from '../likes-episodes/likes-episodes.entity';
import { Favorites } from '../favorites/favorites.entity';
import { Comments } from '../comments/comments.entity';
import { LikesComments } from '../likes-comments/likes-comments';
import { Roles } from './roles.entity';
import { Watchlist } from '../watchlist/watchlist.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Roles, (role) => role.users, { cascade: true, eager: true })
  role: Roles;

  @OneToMany(() => LikesEpisodes, (like) => like.user, { cascade: true })
  likes: LikesEpisodes[];

  @OneToMany(() => LikesComments, (like) => like.user, { cascade: true })
  likesComments: LikesComments[];

  @OneToMany(() => Favorites, (favorites) => favorites.users, { cascade: true })
  favorites: Favorites[];

  @OneToMany(() => Comments, (comments) => comments.users, { cascade: true })
  comments: Comments[];

  @OneToMany(() => Watchlist, (wathlist) => wathlist.users, { cascade: true })
  watchlist: Watchlist[];
}
