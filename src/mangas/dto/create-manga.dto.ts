import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export enum State {
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
}
export class CreateMangaDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly alternativeName: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly profileImage: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsString()
  readonly artist: string;

  @IsNotEmpty()
  @IsArray()
  readonly category: string[];

  @IsNotEmpty()
  @IsArray()
  readonly chapters: string[];

  @IsNotEmpty()
  @IsDate()
  readonly releaseDate: Date;

  @IsNotEmpty()
  @IsEnum(State, { message: 'Use correct state' })
  readonly state: State;

  @IsNotEmpty()
  @IsNumber()
  readonly rating: number;
}
