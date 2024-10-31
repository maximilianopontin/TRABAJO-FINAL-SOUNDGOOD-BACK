import { BadRequestException, Inject, Injectable, NotFoundException, Param } from '@nestjs/common';
import { UpdateTendenciaDto } from './dto/update-tendencia.dto';
import { Tendencia } from './entities/tendencia.entity';
import { In, Repository } from 'typeorm';
import { Canciones } from 'src/canciones/entities/cancion.entity';
 
@Injectable()
export class TendenciasService {
  constructor(
    @Inject('TENDENCIA_REPOSITORY')
    private tendenciaRepository: Repository<Tendencia>,
    @Inject('CANCION_REPOSITORY')
    private cancionRepository: Repository<Canciones>
  ){}

  async createTendencia(cancionesId:number[]): Promise<Tendencia> {
    if(cancionesId.length > 15){
      throw new BadRequestException('Deben ser menos de 15 canciones');
    }
    const canciones = await this.cancionRepository.find({
      where: {cancionId: In(cancionesId) }
     });

    if (canciones.length > 15) {
      throw new Error('No puedes añadir más de 15 canciones a una tendencia.');
    }

    const tendencia = this.tendenciaRepository.create({ canciones });
    return this.tendenciaRepository.save(tendencia);
  }

  async findAllTendencia(): Promise<Tendencia[]> {
    const tendencia = await this.tendenciaRepository.find({
      relations: ['canciones']
    });
    if(!tendencia) {
      throw new NotFoundException('No se encontraron tendencias');
    }
    return tendencia;
  }

 async updateTendencia( tendenciasId: number, updateTendenciaDto: UpdateTendenciaDto): Promise<Tendencia> {
const {cancionId, ...updateFilelds} = updateTendenciaDto

    const tendencia =await  this.tendenciaRepository.findOne({
     where: {tendenciasId},
     relations:['canciones']
    });
    if(!tendencia) throw new NotFoundException('La tendencia no existe');

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
      tendencia.canciones = canciones;
    }
    Object.assign(tendencia, updateFilelds);
    
    return this.tendenciaRepository.save(tendencia);
  }

  async removeTendencia(@Param('id') tendenciaId: number): Promise <any> {
    const tendencia =await this.tendenciaRepository.findOne({
      where: {tendenciasId: tendenciaId}
    });
    if(!tendencia) throw new NotFoundException(`Tendencia con id${tendenciaId} no existe`)
    return await this.tendenciaRepository.delete(tendenciaId);
  }
}
