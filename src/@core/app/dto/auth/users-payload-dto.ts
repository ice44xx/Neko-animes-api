import { IsNumber, IsString } from 'class-validator';

export class UsersPayloadDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly email: string;

  @IsString()
  readonly userName: string;

  @IsString()
  readonly profile: string;

  @IsString()
  readonly role: string;

  @IsString()
  readonly iat?: string;

  @IsNumber()
  readonly exp?: number;
}
