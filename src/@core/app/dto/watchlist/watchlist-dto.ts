import { IsNumber, IsString } from 'class-validator';

export class WatchListDto {
  @IsNumber()
  readonly id?: number;

  @IsNumber()
  readonly userId?: number;

  @IsString()
  readonly anime?: string;

  @IsString()
  readonly thumbnailUrl?: string;

  @IsString()
  readonly videoUrl?: string;

  @IsNumber()
  readonly episodeId?: number;

  @IsNumber()
  readonly order?: number;
}
