import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentsDto {
  @IsNumber()
  episodeId?: number;

  @IsNotEmpty({ message: 'O texto é obrigatório' })
  @IsString()
  @MinLength(1, { message: 'O comentário deve ter pelo menos 1 caracter' })
  @MaxLength(300, { message: 'O comentário deve ter no máximo 250 caracteres' })
  text: string;
}
