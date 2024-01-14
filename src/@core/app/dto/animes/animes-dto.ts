import { IsString, IsBoolean, IsArray, IsNumber } from 'class-validator';

export class AnimesDto {
  @IsNumber()
  readonly id?: number;

  @IsString()
  readonly name?: string;

  @IsString()
  readonly synopsis?: string;

  @IsString()
  readonly thumbnailUrl?: string;

  @IsString()
  readonly background?: string;

  @IsBoolean()
  readonly feature?: boolean;

  @IsString()
  readonly status?: string;

  @IsString()
  readonly types?: string;

  @IsString()
  readonly dubbeds?: string;

  @IsString()
  readonly classifications?: string;

  @IsArray()
  readonly categoryNames?: string[];
}
