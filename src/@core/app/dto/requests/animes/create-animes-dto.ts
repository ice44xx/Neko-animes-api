import { IsString, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCategoriesDto } from 'src/@core/app/dto/requests/categories/create-categories-dto';

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

  @ValidateNested({ each: true })
  @Type(() => CreateCategoriesDto)
  readonly category: CreateCategoriesDto[];
}
