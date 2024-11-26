import { Inject, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { UpdateFavoritoDto } from './dto/update-favorito.dto';
import { Repository } from 'typeorm';
import { Favoritos } from './entities/favorito.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Canciones } from 'src/canciones/entities/cancion.entity';

@Injectable()
export class FavoritosService {
  constructor(
    @Inject('FAVORITO_REPOSITORY')//Se utiliza para interactuar con la tabla de favoritos.
    private favoritoRepository: Repository<Favoritos>,
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
    @Inject('CANCION_REPOSITORY')
    private cancionRepository: Repository<Canciones>,
  ) { }

  //Crear favoritos
  async createOneFavorite(createFavoritoDto: CreateFavoritoDto) {
    const { usuarioId, cancionId } = createFavoritoDto;
  
    // Buscar usuario por ID
    const usuario = await this.usuarioRepository.findOne({
      where: { usuarioId },
    });
  
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
  
    // Buscar canción por ID
    const cancion = await this.cancionRepository.findOne({
      where: { cancionId: cancionId },
    });
  
    if (!cancion) {
      throw new Error('Canción no encontrada');
    }
  
    // Crear y guardar el favorito
    const favorito = this.favoritoRepository.create({
      usuario,
      cancion,
    });
    this.favoritoRepository.save(favorito);
    return { "message": "Favorito creado de forma correcta"}
  }
  

  //Trae todos los favoritos de la base de datos, incluyendo las relaciones con usuarios y canciones 
  async findAllFavorites(idUser: number) {
    const favoritos = await this.favoritoRepository.find({
      where: {
        usuario: {
          usuarioId: idUser,
        },
      },
      relations: ['usuarios', 'canciones']
    });
    if (!favoritos.length) throw new NotFoundException("no favorites found in database");

    return favoritos;

  }

  async findOneFavorite(id: number) {
    const favorito = await this.favoritoRepository.findOne({
      where: { favoritoId: id },
      relations: ['canciones', 'usuarios']
    });
    if (!favorito) {
      throw new NotFoundException(`El favorito con ID ${id} no se encontro`);

    }
    return favorito;
  }
 
  //eliminar un favorito
  async removeFavorite(cancionId: number, userId: number): Promise<any> {
    // Buscar el favorito basado en el ID de la canción y el usuario
    const favorito = await this.favoritoRepository.findOne({
      where: {
        cancion: {
          cancionId: cancionId,
        },
        usuario: {
          usuarioId: userId,
        },
      },
      relations: ['cancion', 'usuario'],
    });
  
    if (!favorito) {
      throw new NotFoundException(
        `El favorito con la canción ID ${cancionId} no se encontró para el usuario ID ${userId}`,
      );
    }
  
    // Eliminar el favorito encontrado
    await this.favoritoRepository.delete(favorito.favoritoId);
  
    return { message: `El favorito asociado a la canción ID ${cancionId} fue eliminado` };
  }
  

}
