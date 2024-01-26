import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateAdminsDto {
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

  @ApiProperty({ description: 'Senha do administrador' })
  @IsNotEmpty({ message: 'A senha é obrigatório' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @MaxLength(20, { message: 'A senha deve ter no máximo 20 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número',
  })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: 'ID da função do administrador', example: 1 })
  @IsNotEmpty({ message: 'A role é obrigatório' })
  @IsNumber()
  readonly roleId: number;
}
