import { PartialType } from '@nestjs/swagger';
import { CreateEpisodesDto } from './create-episodes-dto';

export class UpdateEpisodesDto extends PartialType(CreateEpisodesDto) {}
