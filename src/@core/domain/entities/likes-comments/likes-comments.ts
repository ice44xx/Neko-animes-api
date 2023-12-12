import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comments } from '../comments/comments.entity';
import { Users } from '../users/users.entity';

@Entity('likes-comments')
export class LikesComments {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Comments, (comments) => comments.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  comments: Comments;

  @ManyToOne(() => Users, (user) => user.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: Users;
}
