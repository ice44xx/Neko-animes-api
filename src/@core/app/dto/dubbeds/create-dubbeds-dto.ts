import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDubbedsDto {
  @ApiProperty({ description: 'Tipo do anime', example: 'Dub ou Leg' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  name: string;
}
