import { IsEnum, MinLength } from 'class-validator';

export enum State {
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
}
export class CreateMangaDto {
  @MinLength(3) //https://github.com/typestack/class-validator
  readonly name: string;

  readonly alternativeName: string;

  readonly description: string;

  readonly profileImage: string;

  readonly author: string;

  readonly artist: string;

  readonly category: string[];

  readonly chapters: string[];

  readonly releaseDate: Date;

  @IsEnum(State, { message: 'Use correct state' })
  readonly state: State;

  readonly rating: number;
}
