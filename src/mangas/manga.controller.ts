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
import { Manga } from './schemas/manga.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard())
  createManga(
    @Body(new ValidationPipe()) createMangaDto: CreateMangaDto,
  ): Promise<Manga> {
    return this.mangaService.createManga(createMangaDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  updateManga(@Param('id') id: string, @Body() updateMangaDto: UpdateMangaDto) {
    return this.mangaService.updateManga(id, updateMangaDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteManga(@Param('id') id: string) {
    return this.mangaService.deleteManga(id);
  }
}
