import { IsNumber, IsString } from 'class-validator';

export class BackgroundsDto {
  @IsNumber()
  readonly id?: number;

  @IsString()
  readonly url?: string;

  @IsNumber()
  readonly order?: number;
}
