import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateSeasonsDto {
  @ApiProperty({ description: 'Nome da temporada', example: 'Temporada 1 Jujutsu No Kaisen' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Ordem da temporada', example: 1 })
  @IsNotEmpty({ message: 'A ordem é obrigatória' })
  @IsNumber()
  readonly order: number;

  @ApiProperty({ description: 'ID do anime relacionado à temporada', example: 1 })
  @IsNotEmpty({ message: 'O ID do anime é obrigatório' })
  @IsNumber()
  readonly animeId: number;
}
