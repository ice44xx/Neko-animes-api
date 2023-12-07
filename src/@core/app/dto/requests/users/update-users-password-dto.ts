import { IsString } from 'class-validator';

export class UpdateUsersPasswordDto {
  @IsString()
  readonly password: string;

  @IsString()
  readonly newPassword: string;
}
