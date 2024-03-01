import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { MangasService } from './mangas.service';
import { GalsenMangasGuard } from 'src/galsen-mangas/galsen-mangas.guard';

@Controller('mangas')
export class MangasController {
  constructor(private readonly mangasService: MangasService) {}
  @Get()
  getMangas(@Query('type') type: 'murim' | 'action') {
    return this.mangasService.getMangas(type);
  }

  @Get()
  getMangasWithQuery(@Query('type') type: string) {
    return [{ type }]; // example : /mangas?type=murim
  }

  @Get(':id')
  getManga(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.mangasService.getManga(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @UseGuards(GalsenMangasGuard)
  createManga(@Body(new ValidationPipe()) createMangaDto: CreateMangaDto) {
    return this.mangasService.createManga(createMangaDto);
  }

  @Put(':id')
  updateManga(@Param('id') id: string, @Body() updateMangaDto: UpdateMangaDto) {
    return this.mangasService.updateManga(+id, updateMangaDto);
  }

  @Delete(':id')
  deleteManga(@Param('id') id: string) {
    return this.mangasService.deleteManga(+id);
  }
}
