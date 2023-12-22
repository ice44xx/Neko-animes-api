import { IsNumber, IsString } from 'class-validator';

export class CreateBackgroundsDto {
  @IsString()
  readonly url: string;

  @IsNumber()
  readonly order: number;
}
