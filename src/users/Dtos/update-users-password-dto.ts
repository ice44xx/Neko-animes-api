import { IsString } from 'class-validator';

export class UpdateUsersPasswordDto {
  @IsString()
  readonly oldPassword: string;

  @IsString()
  readonly password: string;
}
