import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotFutureDateConstraint } from '../../../domain/validators/is-not-future-date.validator';
import { IsNotTooOldDateConstraint } from '../../../domain/validators/is-not-too-old-date.validator';
import { IsDate, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength, Validate } from 'class-validator';

export class CreateUsersDto {
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
  @Validate(IsNotFutureDateConstraint, { message: 'A data de nascimento não pode ser no futuro' })
  @Validate(IsNotTooOldDateConstraint, { message: 'A data de nascimento deve ser depois de 1920' })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  readonly birthday: Date;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @MaxLength(20, { message: 'A senha deve ter no máximo 20 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número',
  })
  @IsString()
  readonly password: string;
}
