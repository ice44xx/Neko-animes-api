import { IsNumber, IsString } from 'class-validator';

export class CreateSeasonsDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly animeId: number;
}
