import { IsEnum, MinLength } from 'class-validator';

export class CreateMangaDto {
  @MinLength(3) //https://github.com/typestack/class-validator
  name: string;

  @IsEnum(['murim', 'action'], { message: 'Use correct type' })
  type: 'murim' | 'action';
}
