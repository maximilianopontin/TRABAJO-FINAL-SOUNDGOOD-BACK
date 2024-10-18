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
  async createOneFavorite(createFavoritoDto: CreateFavoritoDto): Promise<Favoritos> {
    const { usuarioId, cancionId, ...favoritoData } = createFavoritoDto
    //Se busca al usuario en la base de datos usando el usuarioId
    const usuario = await this.usuarioRepository.findOne({
      where: { usuarioId }
    });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    //Si el usuario existe, se crea un nuevo favorito
    const favorito = this.favoritoRepository.create({
      ...favoritoData,
      usuarios: [usuario], // Aquí usuarios se añade a un array de usuario
      //cancionId es un array de varios valores, así que se procesa cada canción y se añade correctamente a la relación.
      canciones: cancionId.map(id => ({ cancionId: id }))//mapeando cancionId a objetos que contienen solo cancionId.
    });//se crea un array de objetos que representan las canciones, donde cada objeto tiene una propiedad cancionId
    return this.favoritoRepository.save(favorito);
  }

  //Trae todos los favoritos de la base de datos, incluyendo las relaciones con usuarios y canciones 
  async findAllFavorites(): Promise<Favoritos[]> {
    const favorito = await this.favoritoRepository.find({
      relations: ['usuarios', 'canciones']
    });
    if (!favorito.length) throw new NotFoundException("no favorites found in database");
    return favorito;
  }

  async findOneFavorite(id: number) {
    const favorito = await this.favoritoRepository.findOne({
      where: { favoritoId: id },
      relations: ['canciones', 'usuarios']
    });
    if(!favorito){
      throw new NotFoundException(`El favorito con ID ${id} no se encontro`);

    }
    return favorito;
  }
  async updateFavorite(favoritoId: number, updateFavoritoDto: UpdateFavoritoDto): Promise<Favoritos> {
    const { usuarioId, cancionId, ...updateFields } = updateFavoritoDto;
  
    // Buscar el favorito por su ID y cargar las relaciones existentes
    const favorito = await this.favoritoRepository.findOne({
      where: { favoritoId },
      relations: ['canciones', 'usuarios'],
    });
  
    if (!favorito) {
      throw new NotFoundException(`El favorito con ID ${favoritoId} no existe.`);
    }
  
    // Si el usuarioId existe en el DTO, buscar el nuevo usuario
    if (usuarioId) {
      const usuario = await this.usuarioRepository.findOne({
        where: { usuarioId },
      });
  
      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }
  
      // Asignar el nuevo usuario al favorito
      favorito.usuarios = [usuario];
    }
  
    // Si cancionId existe en el DTO y tiene canciones, buscar las nuevas canciones
    if (cancionId && cancionId.length > 0) {
      const canciones = await this.cancionRepository
        .createQueryBuilder('cancion')
        .where('cancion.cancionId IN (:...ids)', { ids: cancionId })
        .getMany();
  
      // Verificar si todas las canciones fueron encontradas
      if (!canciones || canciones.length !== cancionId.length) {
        throw new NotFoundException('Algunas de las canciones no se encontraron');
      }
  
      // Asignar las nuevas canciones al favorito
      favorito.canciones = canciones;
    }
  
    // Actualizar cualquier otro campo del favorito
    Object.assign(favorito, updateFields);
  
    // Guardar los cambios en el favorito
    return await this.favoritoRepository.save(favorito);
  }
  

  //eliminar un favorito
  async removeFavorite(id: number): Promise<any> {
    const result = await this.favoritoRepository.delete(id);
    if(!result){
      throw new NotFoundException(`El favorito con ID ${id} no se encontro`);
    } 
    return { message: `El favorito con ${id} fue eliminado` }
  
  }
}
