import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export enum State {
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
}
@Schema({
  timestamps: true,
})
export class Manga {
  @Prop()
  name: string;

  @Prop()
  alternativeName: string;

  @Prop()
  description: string;

  @Prop()
  profileImage: string;

  @Prop()
  author: string;

  @Prop()
  artist: string;

  @Prop()
  category: string[];

  @Prop()
  chapters: string[];

  @Prop()
  releaseDate: Date;

  @Prop()
  state: State;

  @Prop({ type: Number, min: 0, max: 5 })
  rating: number;
}

export const MangaSchema = SchemaFactory.createForClass(Manga);
