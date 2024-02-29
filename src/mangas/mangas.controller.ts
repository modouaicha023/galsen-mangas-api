import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';

@Controller('mangas')
export class MangasController {
  @Get()
  getMangas(@Query('type') type: string) {
    return [{ type }];
  }

  @Get()
  getMangasWithQuery(@Query('type') type: string) {
    return [{ type }]; // example : /mangas?type=murim
  }

  @Get(':id')
  getMangaById(@Param('id') id: string) {
    return { id };
  }

  @Post()
  createManga(@Body() createMangaDto: CreateMangaDto) {
    return { name: createMangaDto.name };
  }

  @Put(':id')
  updateManga(@Param('id') id: string, @Body() updateMangaDto: UpdateMangaDto) {
    return { id, name: updateMangaDto.name };
  }

  @Delete(':id')
  deleteManga(@Param('id') id: string) {
    return { id };
  }
}
