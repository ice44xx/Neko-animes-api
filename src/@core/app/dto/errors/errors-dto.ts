import { IsNumber, IsString } from 'class-validator';

export class ErrorsDto {
  @IsNumber()
  readonly id?: number;

  @IsString()
  readonly anime?: string;

  @IsNumber()
  readonly episodeId?: number;
}
