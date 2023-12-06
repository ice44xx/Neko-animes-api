import { IsString } from 'class-validator';

export class CreateBackgroundsDto {
  @IsString()
  readonly url: string;
}
