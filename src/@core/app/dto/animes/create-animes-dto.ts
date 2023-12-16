import { IsString, IsBoolean, IsArray } from 'class-validator';

export class CreateAnimesDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly synopsis: string;

  @IsString()
  readonly thumbnailUrl: string;

  @IsBoolean()
  readonly feature: boolean;

  @IsArray()
  @IsString({ each: true })
  readonly categoryName: string[];

  @IsString()
  classificationName: string;
}
