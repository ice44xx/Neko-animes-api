import { IsString, IsNumber } from 'class-validator';

export class EpisodesDto {
  @IsNumber()
  readonly id?: number;

  @IsString()
  readonly name?: string;

  @IsString()
  readonly url?: string;

  @IsString()
  readonly thumbnailUrl?: string;

  @IsNumber()
  readonly episodeOrder?: number;
}
