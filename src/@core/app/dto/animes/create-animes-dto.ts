import { IsString, IsBoolean, IsArray, IsNotEmpty } from 'class-validator';

export class CreateAnimesDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  readonly name: string;

  @IsNotEmpty({ message: 'O synopsis é obrigatório' })
  @IsString()
  readonly synopsis: string;

  @IsNotEmpty({ message: 'A thumbnail é obrigatória' })
  @IsString()
  readonly thumbnailUrl: string;

  @IsNotEmpty({ message: 'O destaque é obrigatório' })
  @IsBoolean()
  readonly feature: boolean;

  @IsNotEmpty({ message: 'A classificação é obrigatória' })
  @IsString()
  readonly classificationName: string;

  @IsNotEmpty({ message: 'A classificação é obrigatória' })
  @IsArray()
  readonly categoryNames: string[];
}
