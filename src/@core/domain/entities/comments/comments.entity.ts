import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';
import { Episodes } from '../episodes/episodes.entity';
import { LikesComments } from '../likes-comments/likes-comments';

@Entity('comments')
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Users, (user) => user.comments)
  users: Users;

  @ManyToOne(() => Episodes, (episodes) => episodes.comments)
  episodes: Episodes;

  @OneToMany(() => LikesComments, (like) => like.comments, { cascade: true })
  likes: LikesComments[];
}
