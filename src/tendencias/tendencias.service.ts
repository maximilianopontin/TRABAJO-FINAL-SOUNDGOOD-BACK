import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTendenciaDto } from './dto/create-tendencia.dto';
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

  findOne(id: number) {
    return `This action returns a #${id} tendencia`;
  }

  update(id: number, updateTendenciaDto: UpdateTendenciaDto) {
    return `This action updates a #${id} tendencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} tendencia`;
  }
}
