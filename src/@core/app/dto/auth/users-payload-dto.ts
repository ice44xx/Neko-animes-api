import { IsNumber, IsString } from 'class-validator';

export class UsersPayloadDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly email: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly userName: string;

  @IsString()
  readonly role: string;

  @IsString()
  readonly iat?: string;

  @IsNumber()
  readonly exp?: number;
}
