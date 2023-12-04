import { IsString } from 'class-validator';

export class CreateSeasonsDto {
  @IsString()
  readonly name: string;
}
