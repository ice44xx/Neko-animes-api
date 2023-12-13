import { IsString } from 'class-validator';

export class CreateRolesDto {
  @IsString()
  readonly role: string;
}
