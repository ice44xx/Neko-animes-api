import { IsString } from 'class-validator';

export class UpdateUsersDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly userName: string;

  @IsString()
  readonly email: string;
}
