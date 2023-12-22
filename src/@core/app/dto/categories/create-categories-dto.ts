import { IsString } from 'class-validator';

export class CreateCategoriesDto {
  @IsString()
  readonly name: string;
}
