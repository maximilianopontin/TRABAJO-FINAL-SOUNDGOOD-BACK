import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Repository } from 'typeorm';
import { Playlists } from './entities/playlist.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @Inject('PLAYLIST_REPOSITORY')
    private playlistRepository: Repository<Playlists>,
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) { }

  async createOnePlaylist(createPlaylistDto: CreatePlaylistDto): Promise<Playlists> {
    const { usuarioId, cancionId, ...restData } = createPlaylistDto;
    //Se busca al usuario en la base de datos usando el usuarioId
    const usuario = await this.usuarioRepository.findOne({
      where: { usuarioId }
    });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    //Si el usuario existe, se crea una nueva playlist
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


  findOne(id: number) {
    return `This action returns a #${id} playlist`;
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
