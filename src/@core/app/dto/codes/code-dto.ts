import { IsNumber } from 'class-validator';

export class CodesDto {
  @IsNumber()
  readonly id?: number;

  @IsNumber()
  readonly code?: number;
}
