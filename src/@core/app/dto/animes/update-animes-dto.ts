import { IsString, IsBoolean, IsArray, IsNumber } from 'class-validator';

export class UpdateAnimesDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly synopsis: string;

  @IsString()
  readonly thumbnailUrl: string;

  @IsBoolean()
  readonly feature: boolean;

  @IsString()
  readonly classificationName: string;

  @IsArray()
  readonly categoryNames: string[];
}
