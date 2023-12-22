import { IsNumber, IsString } from 'class-validator';

export class UpdateBackgroundsDto {
  @IsString()
  readonly url: string;

  @IsNumber()
  readonly order: number;
}
