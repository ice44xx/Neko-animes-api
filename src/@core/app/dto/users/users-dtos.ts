import { IsNumber, IsString } from 'class-validator';

export class UsersDto {
  @IsNumber()
  readonly id?: number;

  @IsString()
  readonly userName?: string;

  @IsString()
  readonly email?: string;

  @IsString()
  readonly password?: string;
}
