import { PartialType } from '@nestjs/mapped-types';
import { CreateBackgroundsDto } from './create-backgrounds-dto';

export class UpdateBackgroundsDto extends PartialType(CreateBackgroundsDto) {}
