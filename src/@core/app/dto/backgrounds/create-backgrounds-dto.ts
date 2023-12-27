import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateBackgroundsDto {
  @IsNotEmpty()
  @IsString()
  readonly url: string;

  @IsNotEmpty()
  @IsNumber()
  readonly order: number;
}
