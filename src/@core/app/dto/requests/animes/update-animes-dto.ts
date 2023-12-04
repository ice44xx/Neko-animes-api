import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimesDto } from './create-animes-dto';

export class UpdateAnimesDto extends PartialType(CreateAnimesDto) {}
