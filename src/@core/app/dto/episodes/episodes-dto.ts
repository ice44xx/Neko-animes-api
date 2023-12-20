import { IsString, IsNumber } from 'class-validator';

export class EpisodesDto {
  @IsNumber()
  readonly id?: number;

  @IsString()
  readonly name?: string;

  @IsString()
  readonly url?: string;

  @IsNumber()
  readonly episodeOrder?: number;
}
