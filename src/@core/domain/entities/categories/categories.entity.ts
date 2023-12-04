import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Animes } from '../animes/animes.entity';

@Entity('categories')
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: number;

  @JoinTable()
  @ManyToMany(() => Animes, (anime) => anime.categories)
  animes: Animes[];
}
