import { Animes } from 'src/modules/animes/entities/animes.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

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
