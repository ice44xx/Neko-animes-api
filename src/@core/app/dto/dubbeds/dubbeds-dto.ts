import { IsNumber, IsString } from 'class-validator';

export class DubbedsDto {
  @IsNumber()
  id?: number;

  @IsString()
  name?: string;
}
