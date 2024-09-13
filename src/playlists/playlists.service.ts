import { Injectable, Inject, NotFoundException, BadRequestException, Param } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Repository, Like} from 'typeorm';
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
      usuarios: usuario, // Usar el objeto de usuario
      //cancionId es un array de varios valores, así que se procesa cada canción y se añade correctamente a la relación.
      canciones: cancionId.map(id => ({ cancionId: id }))//mapeando cancionId a objetos que contienen solo cancionId.
    });//se crea un array de objetos que representan las canciones, donde cada objeto tiene una propiedad cancionId
    return this.playlistRepository.save(playlist);

  }

  async findAllPlaylists(): Promise<Playlists[]> {
    //Trae todos las playlists de la base de datos, incluyendo las relaciones con usuarios y canciones 
    const playlist = await this.playlistRepository.find({
      relations: ['usuarios', 'canciones']
    });
    if (!playlist.length) throw new NotFoundException("no playlists found in database");
    return playlist;

  }


  async findOnePlaylist(@Param('id') playlistId: number): Promise<Playlists> {
    const playlist = await this.playlistRepository.findOne({
      where: { playlistId },
      relations: ['usuarios', 'canciones'], // Agregamos las relaciones
    });
    if (!playlist) throw new NotFoundException(`la playlist con id: ${playlistId} no se encuentra`);
    return playlist;
  }

  async findPlaylistByTitle(title:string): Promise<Playlists[]> {
    console.log(`Title received for search: ${title}`); // Verificar el valor del título
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new BadRequestException('El título proporcionado no es válido');
    }
    try {
      const playlists = await this.playlistRepository.find({
        where: { title: Like(`%${title}%`) },
        relations: ['usuarios', 'canciones'],
      });
  
      if (playlists.length === 0) {
        throw new NotFoundException(`No se encontraron playlists con el título: ${title}`);
      }
  
      return playlists;
    } catch (error) {
      console.error('Error en findPlaylistByTitle:', error);
      throw new Error('Error en la búsqueda de playlists');
    }
  }

  
  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
