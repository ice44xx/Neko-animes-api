import { IsString } from 'class-validator';

export class ValidateUsersDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
