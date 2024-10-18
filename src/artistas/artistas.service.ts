import { Injectable, Inject, NotFoundException, Param } from '@nestjs/common';
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
//Creamos un artista
  async createOneArtist(createArtistaDto: CreateArtistaDto): Promise<Artistas> {
    const artista = this.artistaRepository.create(createArtistaDto);
    return this.artistaRepository.save(artista);
  }
//Traemos todos los artistas
  async findAllArtist(): Promise <Artistas[]> {
    const artist = await this.artistaRepository.find()
    if (!artist.length) throw new NotFoundException('No se encontraron artistas');
    return await this.artistaRepository.find();
  }
//Buscamos un artista por id
  async findOneArtist(id: number): Promise<any> {
    const artista = await this.artistaRepository.findOne({
      where: {artistaId: id},
      relations: ['canciones']
    });
    if(!artista){
      throw new NotFoundException(`El artista con id ${id} no se encontro`);
    }
    return artista;
  }

//Modificamos un artista
  async updateArtist(@Param('id') artistId: number, updateArtistaDto: UpdateArtistaDto): Promise<any> {
    const newArtist = await this.artistaRepository.preload({
      artistaId: artistId,
      ...updateArtistaDto
    });
    if(!newArtist) throw new NotFoundException(`El artista con id${artistId} no existe.`)
    return this.artistaRepository.save(newArtist);
  }

//Eliminamos un artista
  async removeArtist(id: number): Promise<any> {
    const result = await this.artistaRepository.delete(id);
    if(!result){
      throw new NotFoundException(`El artista con id ${id} no se encontro`)
    }
    return `This action removes a #${id} artista`;
  }
}
