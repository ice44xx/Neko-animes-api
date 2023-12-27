import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoriesDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  readonly name: string;
}
