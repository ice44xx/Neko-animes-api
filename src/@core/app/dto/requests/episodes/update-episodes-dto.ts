import { PartialType } from '@nestjs/mapped-types';
import { CreateEpisodesDto } from './create-episodes-dto';

export class UpdateEpisodesDto extends PartialType(CreateEpisodesDto) {}
