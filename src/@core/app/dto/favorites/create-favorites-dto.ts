import { IsBoolean, IsNumber } from 'class-validator';

export class FavoritesDto {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly animeId?: number;

  @IsBoolean()
  readonly favorite?: number;
}
