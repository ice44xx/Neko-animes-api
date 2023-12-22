import { IsNumber } from 'class-validator';

export class LikesAnimesDto {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly animeId?: number;
}
