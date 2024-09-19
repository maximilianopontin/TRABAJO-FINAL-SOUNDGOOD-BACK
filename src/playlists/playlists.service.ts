import { Injectable, Inject, NotFoundException, BadRequestException, Param, InternalServerErrorException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Repository, Like } from 'typeorm';
import { Playlists } from './entities/playlist.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Canciones } from 'src/canciones/entities/cancion.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @Inject('PLAYLIST_REPOSITORY')
    private playlistRepository: Repository<Playlists>,
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
    @Inject('CANCION_REPOSITORY')
    private cancionRepository: Repository<Canciones>,
  ) { }

  async createOnePlaylist(createPlaylistDto: CreatePlaylistDto): Promise<Playlists> {
    const { usuarioId, cancionId, ...restData } = createPlaylistDto;
    //1. Se busca al usuario en la base de datos usando el usuarioId
    const usuario = await this.usuarioRepository.findOne({
      where: { usuarioId }
    });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    // 2. Validamos que todas las canciones existen
    const canciones = await this.cancionRepository.findByIds(cancionId); // Busca las canciones por sus IDs
    if (canciones.length !== cancionId.length) {
      throw new NotFoundException('Una o más canciones no fueron encontradas');
    }

    //Si el usuario y la cancion existe, se crea una nueva playlist
    const playlist = this.playlistRepository.create({
      ...restData,
      usuario: usuario, // Usar el objeto de usuario
      //cancionId es un array de varios valores, así que se procesa cada canción y se añade correctamente a la relación.
      canciones: cancionId.map(id => ({ cancionId: id }))//mapeando cancionId a objetos que contienen solo cancionId.
    });//se crea un array de objetos que representan las canciones, donde cada objeto tiene una propiedad cancionId
    return this.playlistRepository.save(playlist);

  }

  async findAllPlaylists(): Promise<Playlists[]> {
    //Trae todos las playlists de la base de datos, incluyendo las relaciones con usuarios y canciones 
    const playlist = await this.playlistRepository.find({
      relations: ['usuario', 'canciones']
    });
    if (!playlist.length) throw new NotFoundException("no playlists found in database");
    return playlist;

  }


  async findOnePlaylist(@Param('id') playlistId: number): Promise<Playlists> {
    const playlist = await this.playlistRepository.findOne({
      where: { playlistId },
      relations: ['usuario', 'canciones'], // Agregamos las relaciones
    });
    if (!playlist) throw new NotFoundException(`la playlist con id: ${playlistId} no se encuentra`);
    return playlist;
  }

  async findPlaylistByTitle(title: string): Promise<Playlists[]> {
    
    const trimmedTitle = title.replace(/\s+/g, '');//expresión regular elimina todos los espacios en blanco dentro del título.

    if (!trimmedTitle) {
      throw new BadRequestException('El título proporcionado no es válido');
    }//Si el título queda vacío, se lanza una excepción de tipo BadRequestException 

    try {
      //QueryBuilder de TypeORM para realizar la búsqueda en la base de datos
      const playlists = await this.playlistRepository
        .createQueryBuilder('playlist')//Se inicia la construcción de la consulta para la tabla o entidad playlist
        .where('REPLACE(playlist.title, \' \', \'\') LIKE :title', { title: `%${trimmedTitle}%` })
        //elimina todos los espacios en el título de la base de datos (usando REPLACE) antes de compararlo.
        .leftJoinAndSelect('playlist.usuario', 'usuario')//hace una unión con la tabla relacionada usuario
        .leftJoinAndSelect('playlist.canciones', 'canciones')
        .getMany();//Ejecuta la consulta y devuelve un array con todas las playlists que coinciden con el título buscado.

      // Si no se encuentran playlists, lanzar una excepción
      if (playlists.length === 0) {
        throw new NotFoundException(`No se encontraron playlists con el título: ${title}`); // Error 404: No encontrado
      }
      return playlists;

    } catch (error) {
      // Si el error es una excepción conocida (BadRequest, NotFound), dejar que siga su curso
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      // Para otros errores, lanzar una excepción más clara
      throw new InternalServerErrorException('Error interno en la búsqueda de playlists'); // Error 500: Error del servidor
    }
  }


  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
