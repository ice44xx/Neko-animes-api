import { PartialType } from '@nestjs/mapped-types';
import { CreateClassificationsDto } from './create-classifications-dto';

export class UpdateClassificationsDto extends PartialType(CreateClassificationsDto) {}
