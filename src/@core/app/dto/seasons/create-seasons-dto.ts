import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateSeasonsDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  readonly name: string;

  @IsNotEmpty({ message: 'A ordem é obrigatório' })
  @IsNumber()
  readonly order: number;

  @IsNotEmpty({ message: 'O animeId é obrigatório' })
  @IsNumber()
  readonly animeId: number;
}
