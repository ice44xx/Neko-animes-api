import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsArray, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAnimesDto {
  @ApiProperty({ description: 'Nome do anime' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Sinopse do anime' })
  @IsNotEmpty({ message: 'O synopsis é obrigatório' })
  @MaxLength(345, { message: 'A sinopse não pode ter mais de 345 caracteres' })
  @IsString()
  readonly synopsis: string;

  @ApiProperty({ description: 'URL da imagem thumbnail' })
  @IsNotEmpty({ message: 'A thumbnail é obrigatória' })
  @IsString()
  readonly thumbnailUrl: string;

  @ApiProperty({ description: 'URL da imagem background' })
  @IsNotEmpty({ message: 'O background é obrigatório' })
  @IsString()
  readonly background: string;

  @ApiProperty({ description: 'Indica se o anime está em destaque' })
  @IsNotEmpty({ message: 'O destaque é obrigatório' })
  @IsBoolean()
  readonly feature: boolean;

  @ApiProperty({ description: 'Ano do anime' })
  @IsNotEmpty({ message: 'O ano é obrigatório' })
  @IsString()
  readonly year: string;

  @ApiProperty({ description: 'Status do anime' })
  @IsNotEmpty({ message: 'O status é obrigatório' })
  @IsString()
  readonly status: string;

  @ApiProperty({ description: 'Nome do tipo do anime' })
  @IsNotEmpty({ message: 'O tipo é obrigatória' })
  @IsString()
  readonly types: string;

  @ApiProperty({ description: 'Nome do dubbed do anime' })
  @IsNotEmpty({ message: 'O dubbed é obrigatório' })
  @IsString()
  readonly dubbeds: string;

  @ApiProperty({ description: 'Nome da classificação do anime' })
  @IsNotEmpty({ message: 'A classificação é obrigatória' })
  @IsString()
  readonly classifications: string;

  @ApiProperty({ description: 'Lista de nomes das categorias do anime' })
  @IsNotEmpty({ message: 'A classificação é obrigatória' })
  @IsArray()
  readonly categoryNames: string[];
}
