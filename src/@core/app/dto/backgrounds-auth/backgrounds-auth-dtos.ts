import { IsNumber, IsString } from 'class-validator';

export class BackgroundsAuthDto {
  @IsNumber()
  readonly id?: number;

  @IsString()
  readonly url?: string;

  @IsNumber()
  readonly order?: number;
}
