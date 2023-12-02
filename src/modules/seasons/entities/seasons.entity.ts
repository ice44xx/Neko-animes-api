import { Episodes } from 'src/modules/episodes/entities/episodes.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('Seasons')
export class Seasons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Episodes, (episode) => episode.season, { cascade: true })
  episodes?: Episodes[];
}
