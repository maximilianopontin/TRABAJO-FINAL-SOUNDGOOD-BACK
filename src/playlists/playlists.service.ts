import { Injectable, Inject, NotFoundException, BadRequestException, Param, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Repository, Like } from 'typeorm';
import { Playlists } from './entities/playlist.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Canciones } from 'src/canciones/entities/cancion.entity';
import { PlaylistCancionesDto, PlaylistDto } from './dto/playlist.dto';

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

  //creamos la playlist del usuario
    async createOnePlaylist(createPlaylistDto: CreatePlaylistDto): Promise<Playlists> {
    const { usuarioId, ...restData } = createPlaylistDto;
    //1. Se busca al usuario en la base de datos usando el usuarioId
    const usuario = await this.usuarioRepository.findOne({
      where: { usuarioId }
    });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    //Si el usuario, se crea una nueva playlist
    const playlist = this.playlistRepository.create({
      ...restData,
      usuario: usuario, // Usar el objeto de usuario
    });
    return this.playlistRepository.save(playlist);
  }

  //trae las playlist del usuario
  async findAllPlaylists(usuarioId: number): Promise<PlaylistDto[]> {
    const playlist = await this.playlistRepository.find({
      where: { usuario: { usuarioId } },// Filtramos por el id del usuario
      relations: ['usuario']
    });
    if (!playlist.length) throw new NotFoundException("no playlists found in database");
    return playlist;
  }

  //Trae las canciones de las playlists
  async findOnePlaylist(
    playlistId: number,
    usuarioId: number
  ): Promise<PlaylistCancionesDto> {
    // Busca la playlist con las relaciones necesarias
    const playlist = await this.playlistRepository.findOne({
      where: { playlistId },
      relations: ['usuario', 'canciones'], // Incluye las relaciones con 'usuario' y 'canciones'
    });
  
    // Valida que la playlist exista
    if (!playlist) {
      throw new NotFoundException(`La playlist con id: ${playlistId} no se encuentra`);
    }
  
    // Valida que el usuario sea el dueño de la playlist
    if (playlist.usuario.usuarioId !== usuarioId) {
      throw new UnauthorizedException(
        `El usuario con id: ${usuarioId} no tiene acceso a la playlist con id: ${playlistId}`
      );
    }
  
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

  async deleteOnePlaylist(@Param('id') playlistId: number): Promise<any> {
    const playlist = await this.playlistRepository.findOne({
      where: { playlistId: playlistId }
    })
    if (!playlist) throw new NotFoundException(`La playlist con id${playlistId} no existe`);
    await this.playlistRepository.delete(playlistId);
    return { message: `Playlist ${playlist.title} deleted` }
  }

  //agrega una cancion a la playlist
  async addCancionToPlaylist(playlistId: number, cancionId: number, usuarioId: number): Promise<void> {
    //  Busca al usuario en la base de datos
    const usuario = await this.usuarioRepository.findOne({
      where: { usuarioId }
    });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    // Busca la playlist con las relaciones necesarias
    const playlist = await this.playlistRepository.findOne({
      where: { playlistId },
      relations: ['canciones']
    });
    if (!playlist) {
      throw new NotFoundException(`La playlist con id: ${playlistId} no existe`);
    }

    // Busca la canción por su ID
    const cancion = await this.cancionRepository.findOne({
      where: { cancionId }
    });
    if (!cancion) {
      throw new NotFoundException(`La canción con id: ${cancionId} no existe`);
    }
    // Evita duplicados al agregar
    if (!playlist.canciones.some((c) => c.cancionId === cancionId)) {
      playlist.canciones.push(cancion); // Agrega el objeto `Cancion` a la lista
      await this.playlistRepository.save(playlist); // Guarda los cambios en la base de datos
    }
  }

  //elimina una canción de la playlist
  async removeCancionToPlaylist(playlistId: number, cancionId: number, usuarioId: number): Promise<void> {
    // Busca al usuario en la base de datos
    const usuario = await this.usuarioRepository.findOne({
      where: { usuarioId }
    });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    // Busca la playlist con las relaciones necesarias
    const playlist = await this.playlistRepository.findOne({
      where: { playlistId },
      relations: ['canciones']
    });
    if (!playlist) {
      throw new NotFoundException(`La playlist con id: ${playlistId} no existe`);
    }

    // Verifica si la canción está en la playlist
    const index = playlist.canciones.findIndex((c) => c.cancionId === cancionId);
    if (index === -1) {
      throw new NotFoundException(`La canción con id: ${cancionId} no está en la playlist con id: ${playlistId}`);
    }

    // Elimina la canción de la lista
    playlist.canciones.splice(index, 1);

    // Guarda los cambios en la base de datos
    await this.playlistRepository.save(playlist);
  }



}
