import { IsNumber, IsString } from 'class-validator';

export class ResponsesDto {
  @IsNumber()
  id?: number;

  @IsNumber()
  commentId?: number;

  @IsNumber()
  userId?: number;

  @IsString()
  text?: string;
}
