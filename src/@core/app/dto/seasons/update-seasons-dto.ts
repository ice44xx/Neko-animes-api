import { IsNumber, IsString } from 'class-validator';

export class UpdateSeasonsDto {
  @IsString()
  readonly name?: string;

  @IsNumber()
  readonly animeId?: number;
}
