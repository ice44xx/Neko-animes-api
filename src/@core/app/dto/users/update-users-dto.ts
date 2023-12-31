import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUsersDto {
  @ApiProperty({ description: 'Nome do administrador', example: 'John Doe' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(2, { message: 'O nome deve ter no mínimo 2 caracteres' })
  @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres' })
  @IsString()
  readonly firstName: string;

  @ApiProperty({ description: 'Nome de usuário', example: 'john123' })
  @IsNotEmpty({ message: 'O nickname é obrigatório' })
  @MinLength(3, { message: 'O nome de usuário deve ter no mínimo 3 caracteres' })
  @MaxLength(15, { message: 'O nome de usuário deve ter no máximo 15 caracteres' })
  @IsString()
  readonly userName: string;

  @ApiProperty({ description: 'Endereço de email', example: 'example@example.com' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail({}, { message: 'O email fornecido é inválido' })
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'Data de nascimento', example: '1990-01-01' })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  readonly birthday: Date;

  @IsString()
  readonly profile: string;
}
