import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manga } from './schemas/manga.schema';

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
    const mangas = await this.mangaModel.find();
    return mangas;
  }

  async getManga(id: string): Promise<Manga> {
    const manga = await this.mangaModel.findById(id);
    if (!manga) {
      throw new NotFoundException('Manga not found');
    }
    return manga;
  }

  async createManga(createMangaDto: CreateMangaDto) {
    const res = await this.mangaModel.create(createMangaDto);
    return res;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateManga(id: string, _updateMangaDto: UpdateMangaDto) {
    this.mangas = this.mangas.map((manga) => {
      // if (manga._id === id) {
      //   return { ...manga, ...updateMangaDto };
      // }
      return manga;
    });
    return this.getManga(id);
  }

  deleteManga(id: string) {
    const toBeDelete = this.getManga(id);
    // this.mangas = this.mangas.filter((manga) => manga.id as string !== id);
    return toBeDelete;
  }
}
