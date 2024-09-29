import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateCancionesDto } from './dto/create-canciones.dto';
import { UpdateCancionesDto } from './dto/update-canciones.dto';
import { Repository } from 'typeorm';
import { Canciones } from './entities/cancion.entity';
import { Genero } from 'src/generos/entities/genero.entity';

@Injectable()
export class CancionesService {
  constructor(
    @Inject('CANCION_REPOSITORY')
    private cancionRepository: Repository<Canciones>,
    @Inject('GENERO_REPOSITORY')
    private generoRepository: Repository<Genero>,
  ) {}

  // Crear una nueva canción
  async createOneSong(createCancionesDto: CreateCancionesDto): Promise<Canciones> {
    const { generoId, artistaId, ...cancionData } = createCancionesDto;

    const genero = await this.generoRepository.findOne({ where: { generoId } });
    if (!genero) {
      throw new NotFoundException('Género no encontrado');
    }

    const cancion = this.cancionRepository.create({
      ...cancionData,
      genero,
      artistas: artistaId.map(id => ({ artistaId: id })),
    });

    return this.cancionRepository.save(cancion);
  }

  // Obtener todas las canciones
  async findAllSongs(): Promise<Canciones[]> {
    const canciones = await this.cancionRepository.find({
      relations: ['artistas', 'genero'],
    });

    if (!canciones.length) {
      throw new NotFoundException('No se encontraron canciones');
    }

    return canciones;
  }

  // Obtener una canción por ID
  async findOne(id: number): Promise<Canciones> {
    const cancion = await this.cancionRepository.findOne({
      where: { cancionId: id },
      relations: ['artistas', 'genero'],
    });

    if (!cancion) {
      throw new NotFoundException(`Canción con ID ${id} no encontrada`);
    }

    return cancion;
  }

  // Actualizar una canción
  async update(id: number, updateCancioneDto: UpdateCancionesDto): Promise<Canciones> {
    const cancion = await this.cancionRepository.findOne({
      where: { cancionId: id },
    });

    if (!cancion) {
      throw new NotFoundException(`Canción con ID ${id} no encontrada`);
    }

    Object.assign(cancion, updateCancioneDto);
    return this.cancionRepository.save(cancion);
  }

  // Eliminar una canción
  async remove(id: number): Promise<void> {
    const result = await this.cancionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Canción con ID ${id} no encontrada`);
    }
  }
}
