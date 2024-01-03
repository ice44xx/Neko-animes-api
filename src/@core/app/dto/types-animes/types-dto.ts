import { IsNumber, IsString } from 'class-validator';

export class TypesAnimesDto {
  @IsNumber()
  id?: number;

  @IsString()
  name?: string;
}
