import { PartialType } from '@nestjs/mapped-types';
import { CreateMangaDto, State } from './create-manga.dto';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateMangaDto extends PartialType(CreateMangaDto) {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly alternativeName: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly profileImage: string;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsString()
  readonly artist: string;

  @IsOptional()
  @IsArray()
  readonly category: string[];

  @IsOptional()
  @IsArray()
  readonly chapters: string[];

  @IsOptional()
  @IsDate()
  readonly releaseDate: Date;

  @IsOptional()
  @IsEnum(State, { message: 'Use correct state' })
  readonly state: State;

  @IsOptional()
  @IsNumber()
  readonly rating: number;
}
