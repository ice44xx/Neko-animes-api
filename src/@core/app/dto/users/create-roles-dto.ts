import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRolesDto {
  @IsNotEmpty({ message: 'A role é obrigatória' })
  @IsString()
  readonly name: string;
}
