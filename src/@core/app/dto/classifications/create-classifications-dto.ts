import { IsString } from 'class-validator';

export class CreateClassificationsDto {
  @IsString()
  name: string;

  @IsString()
  thumbnail: string;

  @IsString()
  desc: string;
}
