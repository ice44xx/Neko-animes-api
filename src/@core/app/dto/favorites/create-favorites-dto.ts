import { IsBoolean, IsNumber } from 'class-validator';

export class CreateFavoritesDto {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly animeId?: number;

  @IsBoolean()
  readonly favorite?: number;
}
