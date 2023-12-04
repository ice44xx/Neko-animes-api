import { PartialType } from '@nestjs/mapped-types';
import { CreateSeasonsDto } from './create-seasons-dto';

export class UpdateSeasonsDto extends PartialType(CreateSeasonsDto) {}
