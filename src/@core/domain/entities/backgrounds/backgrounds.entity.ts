import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('backgrounds')
export class Backgrounds {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
}
