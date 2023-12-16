import { IsString } from 'class-validator';

export class UpdateCommentsDto {
  @IsString()
  text: string;
}
