import { IsNumber, IsString } from 'class-validator';

export class CommentsDto {
  @IsNumber()
  id?: number;

  @IsNumber()
  userId?: number;

  @IsNumber()
  episodeId?: number;

  @IsString()
  text?: string;
}
