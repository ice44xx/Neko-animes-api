import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @OneToMany(() => Users, (user) => user.role)
  users: Users[];
}
