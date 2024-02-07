import { IsNumber, IsString } from 'class-validator';

export class WatchListDto {
  @IsNumber()
  readonly id?: number;

  @IsNumber()
  readonly userId?: number;

  @IsNumber()
  readonly animeId?: number;

  @IsString()
  readonly anime?: string;

  @IsString()
  readonly thumbnailUrl?: string;

  @IsNumber()
  readonly episodeId?: number;

  @IsString()
  readonly episodeName?: string;

  @IsNumber()
  readonly type?: string;
}
