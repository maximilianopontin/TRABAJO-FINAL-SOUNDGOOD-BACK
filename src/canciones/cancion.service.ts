import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateCancionesDto } from './dto/create-canciones.dto';
import { UpdateCancionesDto } from './dto/update-canciones.dto';
import { Repository } from 'typeorm';
import { Canciones } from './entities/cancion.entity';
import { Genero } from 'src/generos/entities/genero.entity';

@Injectable()
export class CancionesService {
  constructor(
    // Inyección de dependencias: se inyectan los repositorios de las entidades 'Canciones' y 'Genero' usando @Inject
    @Inject('CANCION_REPOSITORY')
    private cancionRepository: Repository<Canciones>,
    @Inject('GENERO_REPOSITORY')
    private generoRepository: Repository<Genero>,
  ) {}

  // Método para crear una nueva canción en la base de datos
  async createOneSong(createCancionesDto: CreateCancionesDto): Promise<Canciones> {
    // Se desestructura el DTO para obtener 'generoId' y 'artistaId', separando los demás datos de la canción
    const { generoId, artistaId, ...cancionData } = createCancionesDto;

    // Se busca el género en la base de datos usando el 'generoId'
    const genero = await this.generoRepository.findOne({ where: { generoId } });
    if (!genero) {
      // Si el género no se encuentra, se lanza una excepción NotFoundException
      throw new NotFoundException('Género no encontrado');
    }

    // Se crea una nueva instancia de Canción, asociando el género encontrado y asignando los artistas
    const cancion = this.cancionRepository.create({
      ...cancionData,
      genero, // Relación con el género
      artistas: artistaId.map(id => ({ artistaId: id })), // Relación con los artistas
    });

    // Se guarda la canción en la base de datos y se devuelve
    return this.cancionRepository.save(cancion);
  }

  // Método para obtener todas las canciones de la base de datos
  async findAllSongs(): Promise<Canciones[]> {
    // Se buscan todas las canciones, incluyendo sus relaciones con 'artistas' y 'genero'
    const canciones = await this.cancionRepository.find({
      relations: ['artistas', 'genero'], // Carga las relaciones con 'artistas' y 'genero'
    });

    // Si no se encuentran canciones, se lanza una excepción NotFoundException
    if (!canciones.length) {
      throw new NotFoundException("No se encontraron canciones");
    }

    // Se devuelven las canciones encontradas
    return canciones;
  }

  // Método para obtener una canción por su ID
 

  async findOne(id: number): Promise<Canciones> {
    // Cambia 'id' por el nombre correcto del campo de identificación
    const cancion = await this.cancionRepository.findOne({
      where: { cancionId: id }, // Asegúrate de usar el nombre correcto aquí
      relations: ['artistas', 'genero'],
    });
  
    if (!cancion) {
      throw new NotFoundException(`Canción con ID ${id} no encontrada`);
    }
  
    return cancion;
  }
  
  async update(id: number, updateCancioneDto: UpdateCancionesDto): Promise<Canciones> {
    // Cambia 'id' por el nombre correcto del campo de identificación
    const cancion = await this.cancionRepository.findOne({
      where: { cancionId: id }, // Aquí también
    });
  
    if (!cancion) {
      throw new NotFoundException(`Canción con ID ${id} no encontrada`);
    }
  
    Object.assign(cancion, updateCancioneDto);
    return this.cancionRepository.save(cancion);
  }
  

  // Método para eliminar una canción por su ID
  async remove(id: number): Promise<void> {
    // Se elimina la canción de la base de datos usando su ID
    const result = await this.cancionRepository.delete(id);

    // Si no se afectó ninguna fila (es decir, no se encontró la canción), se lanza una excepción NotFoundException
    if (result.affected === 0) {
      throw new NotFoundException(`Canción con ID ${id} no encontrada`);
    }
  }
}
