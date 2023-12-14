import {
  IsString,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCategoriesDto } from 'src/@core/app/dto/requests/categories/create-categories-dto';

export class CreateAnimesDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly synopsis: string;

  @IsNotEmpty()
  @IsString()
  readonly thumbnailUrl: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly feature: boolean;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly categoryName: string[];

  @IsNotEmpty()
  @IsString()
  classificationName: string;

  @ValidateNested({ each: true })
  @Type(() => CreateCategoriesDto)
  readonly category: CreateCategoriesDto[];
}
