import { Module } from '@nestjs/common';
import { MangaController } from './manga.controller';
import { MangaService } from './manga.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MangaSchema } from './schemas/manga.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Manga', schema: MangaSchema }]),
  ],
  controllers: [MangaController],
  providers: [MangaService],
})
export class MangaModule {}
