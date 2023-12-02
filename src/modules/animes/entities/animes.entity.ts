import { Categories } from 'src/modules/categories/entities/categories.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

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
