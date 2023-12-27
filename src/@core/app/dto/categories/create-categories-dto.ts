import { IsString } from 'class-validator';

export class CreateCategoriesDto {
  @IsString({ message: 'O nome é obrigatório' })
  readonly name: string;
}
