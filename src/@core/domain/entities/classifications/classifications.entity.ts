import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Animes } from '../animes/animes.entity';

@Entity('classifications')
export class Classifications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  desc: string;

  @OneToMany(() => Animes, (anime) => anime.classifications)
  animes: Animes[];
}
