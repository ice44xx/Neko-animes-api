import { IsNumber } from 'class-validator';

export class LikesCommentsDto {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly commentId?: number;
}
