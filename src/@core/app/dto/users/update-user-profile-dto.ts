import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUsersProfileDto {
  @ApiProperty({ description: 'Link da imagem', example: 'https://profile.webp' })
  @IsString()
  readonly profile: string;
}
