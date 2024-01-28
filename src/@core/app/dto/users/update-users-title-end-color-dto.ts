import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUsersTitleEndColorDto {
  @ApiProperty({ description: 'Título do usuário', example: 'Oni supremo' })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'Cor do usuário', example: '#FFFFF' })
  @IsString()
  readonly color: string;
}
