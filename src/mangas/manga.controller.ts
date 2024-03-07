import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { MangaService } from './manga.service';
import { GalsenMangasGuard } from 'src/galsen-mangas/galsen-mangas.guard';
import { Manga } from './schemas/manga.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('mangas')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @Get()
  getMangas(@Query() query: ExpressQuery): Promise<Manga[]> {
    return this.mangaService.getMangas(query);
  }

  @Get(':id')
  getManga(@Param('id') id: string): Promise<Manga> {
    return this.mangaService.getManga(id);
  }

  @Post()
  @UseGuards(GalsenMangasGuard)
  createManga(
    @Body(new ValidationPipe()) createMangaDto: CreateMangaDto,
  ): Promise<Manga> {
    return this.mangaService.createManga(createMangaDto);
  }

  @Put(':id')
  updateManga(@Param('id') id: string, @Body() updateMangaDto: UpdateMangaDto) {
    return this.mangaService.updateManga(id, updateMangaDto);
  }

  @Delete(':id')
  deleteManga(@Param('id') id: string) {
    return this.mangaService.deleteManga(id);
  }
}
