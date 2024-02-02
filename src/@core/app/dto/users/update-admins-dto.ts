import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateAdminsDto {
  @ApiProperty({ description: 'Nome de usuário do administrador', example: 'john123' })
  @IsNotEmpty({ message: 'O nickname é obrigatório' })
  @MinLength(3, { message: 'O nome de usuário deve ter no mínimo 3 caracteres' })
  @MaxLength(15, { message: 'O nome de usuário deve ter no máximo 15 caracteres' })
  @IsString()
  readonly userName: string;

  @ApiProperty({ description: 'Email do administrador', example: 'example@example.com' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail({}, { message: 'O email fornecido é inválido' })
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'Data de aniversário do administrador', example: '1990-01-01' })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  readonly birthday: Date;

  @IsString()
  @IsOptional()
  readonly profile: string;

  @ApiProperty({ description: 'ID da função do administrador', example: 1 })
  @IsNotEmpty({ message: 'A role é obrigatório' })
  @IsNumber()
  readonly roleId: number;
}
