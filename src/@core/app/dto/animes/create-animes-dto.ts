import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsArray, IsNotEmpty } from 'class-validator';

export class CreateAnimesDto {
  @ApiProperty({ description: 'Nome do anime' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Sinopse do anime' })
  @IsNotEmpty({ message: 'O synopsis é obrigatório' })
  @IsString()
  readonly synopsis: string;

  @ApiProperty({ description: 'URL da imagem thumbnail' })
  @IsNotEmpty({ message: 'A thumbnail é obrigatória' })
  @IsString()
  readonly thumbnailUrl: string;

  @ApiProperty({ description: 'Indica se o anime está em destaque' })
  @IsNotEmpty({ message: 'O destaque é obrigatório' })
  @IsBoolean()
  readonly feature: boolean;

  @ApiProperty({ description: 'Nome da classificação do anime' })
  @IsNotEmpty({ message: 'A classificação é obrigatória' })
  @IsString()
  readonly classificationName: string;

  @ApiProperty({ description: 'Lista de nomes das categorias do anime' })
  @IsNotEmpty({ message: 'A classificação é obrigatória' })
  @IsArray()
  readonly categoryNames: string[];
}
