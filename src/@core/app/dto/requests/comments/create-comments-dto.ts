import { IsNumber, IsString } from 'class-validator';

export class CreateCommentsDto {
  @IsNumber()
  episodeId?: number;

  @IsString()
  text: string;
}
