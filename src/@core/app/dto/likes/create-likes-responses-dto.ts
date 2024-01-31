import { IsNumber } from 'class-validator';

export class LikesResponsesCommentsDto {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly commentId?: number;
}
