import { Injectable } from '@nestjs/common';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';

@Injectable()
export class MangasService {
  private mangas = [
    { id: 0, name: 'Naruto', type: 'murim' },
    { id: 0, name: 'One Piece', type: 'action' },
  ];

  getMangas(type?: 'murim' | 'action') {
    if (type) {
      return this.mangas.filter((manga) => manga.type === type);
    }
    return this.mangas;
  }

  getManga(id: number) {
    const manga = this.mangas.filter((manga) => manga.id === id);
    if (!manga) {
      throw new Error('Ninja bot found');
    }
    return manga;
  }

  createManga(createMangaDto: CreateMangaDto) {
    const newManga = { ...createMangaDto, id: Date.now() };
    this.mangas.push(newManga);
    return newManga;
  }

  updateManga(id: number, updateMangaDto: UpdateMangaDto) {
    this.mangas = this.mangas.map((manga) => {
      if (manga.id === id) {
        return { ...manga, ...updateMangaDto };
      }
      return manga;
    });
    return this.getManga(id);
  }

  deleteManga(id: number) {
    const toBeDelete = this.getManga(id);
    this.mangas = this.mangas.filter((manga) => manga.id !== id);
    return toBeDelete;
  }
}
