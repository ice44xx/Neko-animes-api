import { IsString } from 'class-validator';

export class UpdateClassificationsDto {
  @IsString()
  name: string;

  @IsString()
  thumbnail: string;

  @IsString()
  desc: string;
}
