import { PartialType } from '@nestjs/swagger';
import { CreateBackgroundsDto } from './create-backgrounds-dto';

export class UpdateBackgroundsDto extends PartialType(CreateBackgroundsDto) {}
