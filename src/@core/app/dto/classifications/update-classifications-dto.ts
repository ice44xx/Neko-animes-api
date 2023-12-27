import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateClassificationsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsString()
  desc: string;
}
