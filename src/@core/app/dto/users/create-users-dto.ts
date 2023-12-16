import { IsString } from 'class-validator';

export class CreateUsersDto {
  readonly id: number;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly userName: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
