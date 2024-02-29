import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MangasModule } from './mangas/mangas.module';
import { AnimesModule } from './animes/animes.module';

@Module({
  imports: [MangasModule, AnimesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
