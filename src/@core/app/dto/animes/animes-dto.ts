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

  @IsBoolean()
  readonly feature?: boolean;

  @IsString()
  readonly type?: string;

  @IsString()
  readonly dubbed?: string;

  @IsString()
  readonly classificationName?: string;

  @IsArray()
  readonly categoryNames?: string[];
}
