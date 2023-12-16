import { PartialType } from '@nestjs/swagger';
import { CreateSeasonsDto } from './create-seasons-dto';

export class UpdateSeasonsDto extends PartialType(CreateSeasonsDto) {}
