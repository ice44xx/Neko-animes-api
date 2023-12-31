import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTypesAnimesDto {
  @ApiProperty({ description: 'Nome do tipo', example: 'Series ou Movies' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  name: string;
}
