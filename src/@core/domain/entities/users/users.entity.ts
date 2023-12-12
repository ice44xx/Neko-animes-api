import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { LikesEpisodes } from '../likes-episodes/likes-episodes.entity';
import { Favorites } from '../favorites/favorites.entity';
import { Comments } from '../comments/comments.entity';
import { LikesComments } from '../likes-comments/likes-comments';

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

  @Column()
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => LikesEpisodes, (like) => like.user)
  likes: LikesEpisodes[];

  @OneToMany(() => LikesComments, (like) => like.user)
  likesComments: LikesComments[];

  @OneToMany(() => Favorites, (favorites) => favorites.users)
  favorites: Favorites[];

  @OneToMany(() => Comments, (comments) => comments.users)
  comments: Comments[];
}
