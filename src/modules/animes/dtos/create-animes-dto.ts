import { IsString } from 'class-validator';

export class CreateAnimesDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly synopsis: string;

  @IsString()
  readonly thumbnailUrl: string;

  @IsString()
  readonly feature: boolean;

  @IsString()
  readonly categoryId: number;
}
