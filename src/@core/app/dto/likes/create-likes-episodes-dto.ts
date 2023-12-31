import { IsBoolean, IsNumber } from 'class-validator';

export class LikesEpisodesDto {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly episodeId?: number;

  @IsBoolean()
  readonly like?: boolean;
}
