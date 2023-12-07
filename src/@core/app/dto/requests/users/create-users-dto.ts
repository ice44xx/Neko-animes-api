import { IsString } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly userName: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  readonly role: string;
}
