import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBackgroundsAuthDto {
  @ApiProperty({ description: 'URL do background', example: 'https://example.com/background.jpg' })
  @IsNotEmpty({ message: 'A URL não pode ficar vazia' })
  @IsString()
  readonly url: string;

  @ApiProperty({ description: 'Ordem do background', example: 1 })
  @IsNotEmpty({ message: 'A ordem não pode ficar vazia' })
  @IsNumber()
  readonly order: number;
}
