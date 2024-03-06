import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMangaDto } from './dto/create-manga.dto';
// import { UpdateMangaDto } from './dto/update-manga.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manga } from './schemas/manga.schema';
import { UpdateMangaDto } from './dto/update-manga.dto';

@Injectable()
export class MangaService {
  constructor(
    @InjectModel(Manga.name)
    private mangaModel: Model<Manga>,
  ) {}

  private mangas = [
    { id: 0, name: 'Naruto', type: 'murim' },
    { id: 0, name: 'One Piece', type: 'action' },
  ];

  async getMangas(): Promise<Manga[]> {
    const allMangas = await this.mangaModel.find();
    return allMangas;
  }

  async getManga(id: string): Promise<Manga> {
    try {
      const manga = await this.mangaModel.findById(id);
      if (!manga) {
        throw new NotFoundException('Manga not found');
      }
      return manga;
    } catch (error) {
      throw new NotFoundException('Manga not found');
    }
  }

  async createManga(createMangaDto: CreateMangaDto): Promise<Manga> {
    const res = await this.mangaModel.create(createMangaDto);
    return res;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateManga(
    id: string,
    updateMangaDto: UpdateMangaDto,
  ): Promise<Manga> {
    try {
      const manga = await this.mangaModel.findByIdAndUpdate(
        id,
        updateMangaDto,
        { new: true, runValidators: true },
      );
      if (!manga) {
        throw new NotFoundException('Manga not found');
      }
      return manga;
    } catch (error) {
      throw new NotFoundException('Manga not found');
    }
  }

  async deleteManga(id: string) {
    try {
      const manga = await this.mangaModel.findByIdAndDelete(id);
      if (!manga) {
        throw new NotFoundException('Manga not found');
      }
      return manga;
    } catch (error) {
      throw new NotFoundException('Manga not found');
    }
  }
}
