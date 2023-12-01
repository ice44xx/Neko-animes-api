import { IsString, IsNumber } from 'class-validator';

export class CreateCategoriesDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly position: number;
}
