import { IsNumber, IsString } from 'class-validator';

export class SeasonsDto {
  @IsNumber()
  readonly id?: number;

  @IsString()
  readonly name?: string;

  @IsNumber()
  readonly order?: number;

  @IsNumber()
  readonly animeId?: number;
}
