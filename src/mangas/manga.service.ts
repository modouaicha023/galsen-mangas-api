import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMangaDto } from './dto/create-manga.dto';
// import { UpdateMangaDto } from './dto/update-manga.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Manga } from './schemas/manga.schema';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Injectable()
export class MangaService {
  constructor(
    @InjectModel(Manga.name)
    private mangaModel: Model<Manga>,
  ) {}

  async getMangas(query: ExpressQuery): Promise<Manga[]> {
    const limitPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const skip = limitPerPage * (currentPage - 1);

    const search = query.search
      ? {
          name: {
            $regex: query.search,
            $options: 'i',
          },
        }
      : {};
    const allMangas = await this.mangaModel
      .find({ ...search })
      .limit(limitPerPage)
      .skip(skip);
    return allMangas;
  }

  async getManga(id: string): Promise<Manga> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter a correct Id');
    }
    const manga = await this.mangaModel.findById(id);
    if (!manga) {
      throw new NotFoundException('Manga not found');
    }
    return manga;
  }

  async createManga(createMangaDto: CreateMangaDto): Promise<Manga> {
    const res = await this.mangaModel.create(createMangaDto);
    return res;
  }

  async updateManga(
    id: string,
    updateMangaDto: UpdateMangaDto,
  ): Promise<Manga> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter a correct Id');
    }
    const manga = await this.mangaModel.findByIdAndUpdate(id, updateMangaDto, {
      new: true,
      runValidators: true,
    });
    if (!manga) {
      throw new NotFoundException('Manga not found');
    }
    return manga;
  }

  async deleteManga(id: string) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter a correct Id');
    }
    const manga = await this.mangaModel.findByIdAndDelete(id);
    if (!manga) {
      throw new NotFoundException('Manga not found');
    }
    return manga;
  }
}
