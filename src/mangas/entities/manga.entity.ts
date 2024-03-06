export enum State {
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
}
export class Manga {
  name: string;

  alternativeName: string;

  description: string;

  profileImage: string;

  author: string;

  artist: string;

  category: string[];

  chapters: string[];

  releaseDate: Date;

  state: State;

  rating: number;
}
