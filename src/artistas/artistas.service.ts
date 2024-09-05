import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { Artistas } from './entities/artista.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistasService {
  constructor(
    @Inject('ARTISTA_REPOSITORY')
    private artistaRepository: Repository<Artistas>
  ) { }

  async createOneArtist(createArtistaDto: CreateArtistaDto): Promise<Artistas> {
    const artista = this.artistaRepository.create(createArtistaDto);
    return this.artistaRepository.save(artista);
  }

  async findAllArtist(): Promise <Artistas[]> {
    const artist = await this.artistaRepository.find()
    if (!artist.length) throw new NotFoundException('No se encontraron artistas');
    return await this.artistaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} artista`;
  }

  update(id: number, updateArtistaDto: UpdateArtistaDto) {
    return `This action updates a #${id} artista`;
  }

  remove(id: number) {
    return `This action removes a #${id} artista`;
  }
}
