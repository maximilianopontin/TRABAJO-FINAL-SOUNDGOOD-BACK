import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { UpdateFavoritoDto } from './dto/update-favorito.dto';
import { Repository } from 'typeorm';
import { Favoritos } from './entities/favorito.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class FavoritosService {
  constructor(
    @Inject ('FAVORITO_REPOSITORY')
    private favoritoRepository: Repository<Favoritos>,
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ){}

  async createOneFavorites(createFavoritoDto: CreateFavoritoDto): Promise<Favoritos> {
    const { usuarioId, cancionId, ...favoritoData } = createFavoritoDto

    const usuario = await this.usuarioRepository.findOne({
      where: { usuarioId }
    });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const favorito = this.favoritoRepository.create({
      ...favoritoData,
      usuarios: [usuario], // Aquí usuarios es un array
      canciones: cancionId.map(id => ({cancionId:id}))   
    });
    return this.favoritoRepository.save(favorito);
  }

  async findAllFavorites(): Promise<Favoritos[]> {
    const favorito = await this.favoritoRepository.find({
      relations: ['usuarios', 'canciones']
    });
    if (!favorito.length) throw new NotFoundException("no usuario in database");
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
