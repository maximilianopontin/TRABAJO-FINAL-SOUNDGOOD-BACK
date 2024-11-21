import { BadRequestException, Inject, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateTop10Dto } from './dto/create-top10.dto';
import { UpdateTop10Dto } from './dto/update-top10.dto';
import { In, Repository } from 'typeorm';
import { Top10 } from './entities/top10.entity';
import { Canciones } from 'src/canciones/entities/cancion.entity';
import { CancionesDto } from 'src/canciones/dto/canciones.dto';
import { plainToInstance } from 'class-transformer';
import { Top10Dto } from './dto/top10.dto';

@Injectable()
export class Top10Service {
  constructor(
    @Inject('TOP10_REPOSITORY')
    private top10Repository: Repository<Top10>,
    @Inject('CANCION_REPOSITORY')
    private cancionRepository: Repository<Canciones>
  ){}

   // Crear una nueva entrada en Top10
   async createTop10(cancionesId: number[]): Promise<Top10> {
    if (cancionesId.length !== 10) { //Cambiar el 3 por 10 que vana  ser la  cantidad de canciones que debe tener
      throw new BadRequestException('Debe haber exactamente 10 canciones en el Top 10.');
    }
    const canciones = await this.cancionRepository.find({
      where: { cancionId: In(cancionesId) }
    });

    if (canciones.length !== 10) { //validacion para la cantidad de canciones

      throw new BadRequestException('Algunas de las canciones no existen en la base de datos.');
    }
    const nuevoTop10 = this.top10Repository.create({ canciones });
    return this.top10Repository.save(nuevoTop10);
  }
  async findAllTop10(): Promise<Top10Dto[]> {
    try {
        const queryBuilder = this.top10Repository.createQueryBuilder('top10');
        queryBuilder
            .leftJoinAndSelect('top10.canciones', 'canciones')
            .leftJoinAndSelect('canciones.genero', 'genero')
            .leftJoinAndSelect('canciones.artistas', 'artistas')
            .orderBy('top10.top10Id', 'ASC');

        const top10Results = await queryBuilder.getMany();

        // Mapea los resultados al DTO
        const top10Dtos = top10Results.map((top10) => ({
            top10Id: top10.top10Id, 
            cancionId: top10.canciones.map((cancion) => ({
                titulo: cancion.titulo,
                songFilename: cancion.songFilename,
                imageFilename: cancion.imageFilename,
                genero: cancion.genero.genero,
                artistas: cancion.artistas.map((artista) => ({
                    nombre: artista.nombre,
                })),
            })),
        }));
        console.log(top10Dtos)

        return plainToInstance(Top10Dto, top10Dtos);
    } catch (error) {
        throw new BadRequestException(error.message, 'Error al obtener los Top 10');
    }
}
  async updateTop10( top10Id: number, updateTop10Dto: UpdateTop10Dto): Promise<Top10> {
    const {cancionId, ...updateFilelds} = updateTop10Dto

    const top10 = await this.top10Repository.findOne({
    where: {top10Id},
    relations:['canciones']
    });
    if (!top10) throw new NotFoundException('Este top 10 no existe')

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
        top10.canciones = canciones;
      }

      Object.assign(top10, updateFilelds);

    return await this.top10Repository.save(top10);
  }

 async removeTop10(@Param('id')top10Id: number): Promise<any> {
  const top10 = await this.top10Repository.findOne({
    where: {top10Id: top10Id}
  })
  if(!top10) throw new NotFoundException(`El top10 con id${top10Id} no existe`);
    return await this.top10Repository.delete(top10Id);
  }
}
