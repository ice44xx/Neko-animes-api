import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClassificationsDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'A thumbnail é obrigatória' })
  @IsString()
  thumbnail: string;

  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @IsString()
  desc: string;
}
