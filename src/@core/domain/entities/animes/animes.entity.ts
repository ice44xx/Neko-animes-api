import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Categories } from '../categories/categories.entity';

@Entity('animes')
export class Animes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  synopsis: string;

  @Column()
  thumbnailUrl: string;

  @Column()
  feature: boolean;

  @ManyToMany(() => Categories, (category) => category.animes, {
    cascade: true,
  })
  categories: Categories[];
}
