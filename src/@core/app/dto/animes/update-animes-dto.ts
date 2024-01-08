import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsArray, IsNotEmpty } from 'class-validator';

export class UpdateAnimesDto {
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

  @ApiProperty({ description: 'Nome do tipo do anime' })
  @IsNotEmpty({ message: 'O tipo é obrigatória' })
  @IsString()
  readonly type: string;

  @ApiProperty({ description: 'Nome do dubbed do anime' })
  @IsNotEmpty({ message: 'O dubbed é obrigatório' })
  @IsString()
  readonly dubbed: string;

  @ApiProperty({ description: 'Nome da classificação do anime' })
  @IsNotEmpty({ message: 'A classificação é obrigatória' })
  @IsString()
  readonly classificationName: string;

  @ApiProperty({ description: 'Lista de nomes das categorias do anime' })
  @IsNotEmpty({ message: 'A classificação é obrigatória' })
  @IsArray()
  readonly categoryNames: string[];
}
