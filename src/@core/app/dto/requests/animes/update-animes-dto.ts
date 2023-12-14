import { PartialType } from '@nestjs/swagger';
import { CreateAnimesDto } from './create-animes-dto';

export class UpdateAnimesDto extends PartialType(CreateAnimesDto) {}
