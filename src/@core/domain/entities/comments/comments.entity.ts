import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;
}
