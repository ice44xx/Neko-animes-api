import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriesDto {
  @ApiProperty({ description: 'Nome da categoria', example: 'Aventura' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  readonly name: string;
}
