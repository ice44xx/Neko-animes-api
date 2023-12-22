import { IsString } from 'class-validator';

export class UpdateClassificationsDto {
  @IsString()
  name: string;

  @IsString()
  desc: string;
}
