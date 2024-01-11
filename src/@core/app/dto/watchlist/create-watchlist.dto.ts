import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWatchListDto {
  @ApiProperty({ description: 'Id do anime' })
  @IsNotEmpty({ message: 'O campo animeId não pode estar vazio' })
  @IsNumber()
  readonly animeId: number;

  @ApiProperty({ description: 'Nome do anime' })
  @IsNotEmpty({ message: 'O campo anime não pode estar vazio' })
  @IsString()
  readonly anime: string;

  @ApiProperty({ description: 'Url do anime' })
  @IsNotEmpty({ message: 'A URL da imagem em miniatura não pode estar vazia' })
  @IsString()
  readonly thumbnailUrl: string;

  @ApiProperty({ description: 'Url do episódio do anime' })
  @IsNotEmpty({ message: 'A URL do vídeo não pode estar vazia' })
  @IsString()
  readonly videoUrl: string;

  @ApiProperty({ description: 'ID do episódio do anime' })
  @IsNotEmpty({ message: 'O ID do episódio não pode estar vazio' })
  @IsNumber()
  readonly episodeId: number;

  @ApiProperty({ description: 'Nome do episódio' })
  @IsNotEmpty({ message: 'O campo episodeName não pode estar vazio' })
  @IsString()
  readonly episodeName: string;

  @ApiProperty({ description: 'Ordem do episódio' })
  @IsNotEmpty({ message: 'A ordem não pode estar vazia' })
  @IsNumber()
  readonly order: number;
}
