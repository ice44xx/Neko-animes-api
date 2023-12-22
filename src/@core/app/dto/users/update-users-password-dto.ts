import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateUsersPasswordDto {
  @IsString()
  readonly password: string;

  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @MaxLength(20, { message: 'A senha deve ter no máximo 20 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número',
  })
  @IsString()
  readonly newPassword: string;
}
