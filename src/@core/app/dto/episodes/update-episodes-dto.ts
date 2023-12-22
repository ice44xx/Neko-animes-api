import { IsString, IsNumber } from 'class-validator';

export class UpdateEpisodesDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly url: string;

  @IsNumber()
  readonly episodeOrder: number;

  @IsNumber()
  readonly seasonId: number;
}
