import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateErrorsDto {
  @ApiProperty({ description: 'Nome do anime', example: 'Chainsaw man' })
  @IsNotEmpty({ message: 'O anime é obrigatório' })
  @IsString()
  anime: string;

  @ApiProperty({ description: 'Episódio ID', example: '2' })
  @IsNotEmpty({ message: 'O episódio id é obrigatório' })
  @IsNumber()
  episodeId: number;
}
