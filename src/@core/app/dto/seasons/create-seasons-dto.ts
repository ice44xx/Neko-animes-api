import { IsString, IsNumber } from 'class-validator';

export class CreateSeasonsDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly order: number;

  @IsNumber()
  readonly animeId: number;
}
