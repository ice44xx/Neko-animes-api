import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordByEmailDto {
  @ApiProperty({ description: 'Código recebido por email', example: '1234567' })
  @IsNotEmpty({ message: 'O código é obrigatório' })
  @IsNumber()
  readonly code: number;

  @ApiProperty({ description: 'Endereço de email', example: 'example@example.com' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail({}, { message: 'O email fornecido é inválido' })
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'Senha nova do usuário' })
  @IsNotEmpty({ message: 'A nova senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @MaxLength(20, { message: 'A senha deve ter no máximo 20 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número',
  })
  @IsString()
  readonly newPassword: string;
}
