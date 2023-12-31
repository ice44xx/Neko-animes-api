import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateClassificationsDto {
  @ApiProperty({ description: 'Nome da classificação', example: 'Shounen' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'URL da imagem thumbnail',
    example: 'https://example.com/thumbnail.jpg',
  })
  @IsNotEmpty({ message: 'A thumbnail é obrigatória' })
  @IsString()
  thumbnail: string;

  @ApiProperty({
    description: 'Descrição da classificação',
    example: 'Shounen',
  })
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @IsString()
  desc: string;
}
