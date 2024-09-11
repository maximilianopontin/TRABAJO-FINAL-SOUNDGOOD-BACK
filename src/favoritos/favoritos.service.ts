import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { UpdateFavoritoDto } from './dto/update-favorito.dto';
import { Repository } from 'typeorm';
import { Favoritos } from './entities/favorito.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class FavoritosService {
  constructor(
    @Inject('FAVORITO_REPOSITORY')//Se utiliza para interactuar con la tabla de favoritos.
    private favoritoRepository: Repository<Favoritos>,
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) { }

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

  async findAllFavorites(): Promise<Favoritos[]> {
    //Trae todos los favoritos de la base de datos, incluyendo las relaciones con usuarios y canciones 
    const favorito = await this.favoritoRepository.find({
      relations: ['usuarios', 'canciones']
    });
    if (!favorito.length) throw new NotFoundException("no favorites found in database");
    return favorito;

  }

  findOne(id: number) {
    return `This action returns a #${id} favorito`;
  }

  update(id: number, updateFavoritoDto: UpdateFavoritoDto) {
    return `This action updates a #${id} favorito`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorito`;
  }
}
