import { PartialType } from '@nestjs/swagger';
import { CreateClassificationsDto } from './create-classifications-dto';

export class UpdateClassificationsDto extends PartialType(CreateClassificationsDto) {}
