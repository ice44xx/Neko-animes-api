import { IsNumber, IsString } from 'class-validator';

export class CategoriesDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name?: string;
}
