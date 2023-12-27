import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateEpisodesDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly url: string;

  @IsNotEmpty()
  @IsNumber()
  readonly episodeOrder: number;

  @IsNotEmpty()
  @IsNumber()
  readonly seasonId: number;
}
