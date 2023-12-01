import { IsString, IsBoolean } from 'class-validator';
import { CreateCategoriesDto } from 'src/modules/categories/dtos/create-categories-dto';

export class CreateAnimesDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly synopsis: string;

  @IsString()
  readonly thumbnailUrl: string;

  @IsBoolean()
  readonly feature: boolean;

  readonly category: CreateCategoriesDto;
}
