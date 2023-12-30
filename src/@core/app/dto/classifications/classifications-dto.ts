import { IsNumber, IsString } from 'class-validator';

export class ClassificationsDto {
  @IsNumber()
  id?: number;

  @IsString()
  name?: string;

  @IsString()
  thumbnail?: string;

  @IsString()
  desc?: string;
}
