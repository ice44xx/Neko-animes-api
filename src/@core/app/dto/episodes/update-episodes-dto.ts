import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateEpisodesDto {
  @ApiProperty({ description: 'Nome do episódio', example: 'Episódio Piloto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'URL do episódio', example: 'https://example.com/episode1.mp4' })
  @IsNotEmpty({ message: 'A URL é obrigatória' })
  @IsString()
  readonly url: string;

  @ApiProperty({
    description: 'URL da thumbnail',
    example: 'https://example.com/jujutsu-no-kaizen.webp',
  })
  @IsNotEmpty({ message: 'A thumbnail é obrigatória' })
  @IsString()
  readonly thumbnailUrl: string;

  @ApiProperty({ description: 'Ordem do episódio na temporada', example: 1 })
  @IsNotEmpty({ message: 'A ordem é obrigatória' })
  @IsNumber()
  readonly episodeOrder: number;

  @ApiProperty({ description: 'ID da temporada relacionada ao episódio', example: 1 })
  @IsNotEmpty({ message: 'O ID da temporada é obrigatório' })
  @IsNumber()
  readonly seasonId: number;
}
