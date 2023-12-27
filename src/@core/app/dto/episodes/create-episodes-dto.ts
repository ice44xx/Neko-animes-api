import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateEpisodesDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  readonly name: string;

  @IsNotEmpty({ message: 'A url é obrigatório' })
  @IsString()
  readonly url: string;

  @IsNotEmpty({ message: 'A ordem é obrigatório' })
  @IsNumber()
  readonly episodeOrder: number;

  @IsNotEmpty({ message: 'A seasonId é obrigatório' })
  @IsNumber()
  readonly seasonId: number;
}
