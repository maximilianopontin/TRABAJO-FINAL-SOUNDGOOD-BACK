import { Injectable, Inject, NotFoundException, } from '@nestjs/common';
import { CreateCancionesDto } from './dto/create-canciones.dto';
import { Repository } from 'typeorm';
import { Canciones } from './entities/cancion.entity';
import { Genero } from 'src/generos/entities/genero.entity';
import { UpdateCancionesDto } from './dto/update-canciones.dto';
import { Artistas } from 'src/artistas/entities/artista.entity';
import { CancionesDto } from './dto/canciones.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class CancionesService {
  constructor(
    @Inject('CANCION_REPOSITORY')
    private cancionRepository: Repository<Canciones>,
    @Inject('GENERO_REPOSITORY')
    private generoRepository: Repository<Genero>,
    @Inject('ARTISTA_REPOSITORY')
    private artistaRepository: Repository<Artistas>,
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>
  ) { }

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
  async findAllSongs(): Promise<CancionesDto[]> {
    const canciones = await this.cancionRepository.find({
      relations: ['artistas', 'genero'],
    });

    if (!canciones.length) {
      throw new NotFoundException('No se encontraron canciones');
    }

    return canciones;
  }

  // Obtener una canción por ID
  async findOneSong(id: number): Promise<Canciones> {
    const cancion = await this.cancionRepository.findOne({
      where: { cancionId: id },
      relations: ['artistas', 'genero'],
    });

    if (!cancion) {
      throw new NotFoundException(`Canción con ID ${id} no encontrada`);
    }

    return cancion;
  }

  // Buscar una canción por título
  async findOneSongByTitle(titulo: string): Promise<Canciones> {
    const cancion = await this.cancionRepository
      .createQueryBuilder('cancion')
      .leftJoinAndSelect('cancion.artistas', 'artista') // Trae los artistas
      .leftJoinAndSelect('cancion.genero', 'genero') // Trae el género
      .where('LOWER(cancion.titulo) = LOWER(:titulo)', { titulo }) // Comparación insensible a mayúsculas
      .getOne();
    if (!cancion) {
      throw new NotFoundException(`Canción con título "${titulo}" no encontrada`);
    }
    return cancion;
  }

  async findTendencias(): Promise<CancionesDto[]> {
    // Filtrar canciones donde tendencias sea true
    return this.cancionRepository.find({
      where: { tendencia: true },
      relations: ['genero', 'artistas'], // Ajustar según las relaciones necesarias
    });
  }

  async findTop10(): Promise<CancionesDto[]> {
    // Filtrar canciones donde top10 sea true
    return this.cancionRepository.find({
      where: { top10: true },
      relations: ['genero', 'artistas'], // Ajustar según las relaciones necesarias
    });
  }

  // Actualizar una canción
  async updateOneCancion(cancionId: number, updateCancionDto: UpdateCancionesDto): Promise<Canciones> {
    const { generoId, artistaId, ...updatedFields } = updateCancionDto;
    // Buscar la canción por su ID
    const cancion = await this.cancionRepository.findOne({
      where: { cancionId },
      relations: ['artistas', 'genero'],
    });
    if (!cancion) {
      throw new NotFoundException(`La canción con ID ${cancionId} no existe.`);
    }
    // Si generoId existe en el DTO, busca el nuevo género
    if (generoId) {
      const genero = await this.generoRepository.findOne({ where: { generoId } });
      if (!genero) {
        throw new NotFoundException('Género no encontrado');
      }
      cancion.genero = genero;
    }
    // Si artistaId existe en el DTO, busca los artistas correspondientes
    if (artistaId && artistaId.length > 0) {
      const artistas = await this.artistaRepository
        .createQueryBuilder('artista')
        .where('artista.artistaId IN (:...ids)', { ids: artistaId })
        .getMany();
      if (!artistas || artistas.length !== artistaId.length) {
        throw new NotFoundException('Algunos de los artistas no se encontraron');
      }
      cancion.artistas = artistas;
    }
    // Actualizar el resto de los campos
    Object.assign(cancion, updatedFields);
    // Guardar la canción actualizada
    return await this.cancionRepository.save(cancion);
  }

  async updateTendencias(id: number, value: boolean): Promise<any> {
    const cancion = await this.cancionRepository.findOne({ where: { cancionId: id } });
    if (!cancion) {
        throw new NotFoundException(`Canción con ID ${id} no encontrada`);
    }
    cancion.tendencia = value;
    await this.cancionRepository.save(cancion);
}

async updateTop10(id: number, value: boolean): Promise<any> {
    const cancion = await this.cancionRepository.findOne({ where: { cancionId: id } });
    if (!cancion) {
        throw new NotFoundException(`Canción con ID ${id} no encontrada`);
    }
    cancion.top10 = value;
    await this.cancionRepository.save(cancion);
}

  // Eliminar una canción
  async remove(id: number): Promise<any> {
    const result = await this.cancionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Canción con ID ${id} no encontrada`);
    } else {
      return { message: `La cancion con ID ${id} fue eliminada` }
    }
  }


  async addUsuarioToCancion(cancionId: number, usuarioId: number): Promise<void> {
    const cancion = await this.cancionRepository.findOne({
        where: { cancionId },
        relations: ['usuarios'], // Asegura cargar la relación
    });

    if (!cancion) {
        throw new NotFoundException(`Canción con ID ${cancionId} no encontrada.`);
    }

    const usuario = await this.usuarioRepository.findOne({ where: { usuarioId } });

    if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado.`);
    }

    // Evita duplicados al agregar
    if (!cancion.usuario.some((user) => user.usuarioId === usuarioId)) {
        cancion.usuario.push(usuario);
        await this.cancionRepository.save(cancion);
    }
}

async removeUsuarioFromCancion(cancionId: number, usuarioId: number): Promise<void> {
    const cancion = await this.cancionRepository.findOne({
        where: { cancionId },
        relations: ['usuarios'], // Asegura cargar la relación
    });

    if (!cancion) {
        throw new NotFoundException(`Canción con ID ${cancionId} no encontrada.`);
    }

    const usuario = cancion.usuario.find((user) => user.usuarioId === usuarioId);

    if (!usuario) {
        throw new NotFoundException(
            `Usuario con ID ${usuarioId} no está relacionado con la canción con ID ${cancionId}.`,
        );
    }

    // Filtra los usuarios para eliminar la relación
    cancion.usuario = cancion.usuario.filter((user) => user.usuarioId !== usuarioId);
    await this.cancionRepository.save(cancion);
}
}
