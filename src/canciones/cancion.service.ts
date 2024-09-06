import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateCancionesDto } from './dto/create-canciones.dto';
import { UpdateCancionesDto } from './dto/update-canciones.dto';
import { Repository} from 'typeorm';
import { Canciones } from './entities/cancion.entity';
import { Genero } from 'src/generos/entities/genero.entity';
 
@Injectable()
export class CancionesService {
  constructor(
    @Inject('CANCION_REPOSITORY')
    private cancionRepository: Repository<Canciones>,
    @Inject('GENERO_REPOSITORY')
    private generoRepository: Repository<Genero>,
) { }

  async createOneSong(createCancionesDto: CreateCancionesDto): Promise<Canciones> {
    const { generoId, artistaId, ...cancionData } = createCancionesDto

    const genero = await this.generoRepository.findOne({
      where: {generoId}
    });
    if(!genero){
      throw new Error('Genero no encontrado');
    }
    const cancion =  this.cancionRepository.create({
      ...cancionData,
      genero,
      artistas: artistaId.map(id => ({artistaId:id}))
    });

    return this.cancionRepository.save(cancion);
  }

  async findAllSongs(): Promise <Canciones[]> {
    const cancion = await this.cancionRepository.find({
      relations: ['artistas', 'genero'], //carga las relaciones de artista y genero
    });
    if (!cancion.length) throw new NotFoundException("no se encontraron canciones");
    
    return cancion;
  }

  findOne(id: number) {
    return `This action returns a #${id} cancione`;
  }

  update(id: number, updateCancioneDto: UpdateCancionesDto) {
    return `This action updates a #${id} cancione`;
  }

  remove(id: number) {
    return `This action removes a #${id} cancione`;
  }
}
