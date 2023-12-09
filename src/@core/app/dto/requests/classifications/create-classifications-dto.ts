import { IsNumber, IsString } from 'class-validator';

export class CreateClassificationsDto {
  @IsString()
  name: string;

  @IsString()
  desc: string;

  @IsNumber()
  animeId: number;
}
