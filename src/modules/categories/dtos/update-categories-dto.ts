import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriesDto } from './create-categories-dto';

export class UpdateCategoryDto extends PartialType(CreateCategoriesDto) {}
