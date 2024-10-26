import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTop10Dto } from './dto/create-top10.dto';
import { UpdateTop10Dto } from './dto/update-top10.dto';
import { In, Repository } from 'typeorm';
import { Top10 } from './entities/top10.entity';
import { Canciones } from 'src/canciones/entities/cancion.entity';

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
    if (cancionesId.length !== 3) { //Cambiar el 3 por 10 que vana  ser la  cantidad de canciones que debe tener
      throw new BadRequestException('Debe haber exactamente 10 canciones en el Top 10.');
    }
    const canciones = await this.cancionRepository.find({
      where: { cancionId: In(cancionesId) }
    });
    if (canciones.length !== 3) { //cambiar el 3 por el 10
      throw new BadRequestException('Algunas de las canciones no existen en la base de datos.');
    }
    const nuevoTop10 = this.top10Repository.create({ canciones });
    return this.top10Repository.save(nuevoTop10);
  }

 async findAllTop10(): Promise<Top10[]> {
  const top10 = await this.top10Repository.find({
    relations: ['canciones']
  })
  if(!top10){
    throw new NotFoundException('No se encontro ningun top 10')
  }
  return top10;
    
  }

  findOne(id: number) {
    return `This action returns a #${id} top10`;
  }

  update(id: number, updateTop10Dto: UpdateTop10Dto) {
    return `This action updates a #${id} top10`;
  }

  remove(id: number) {
    return `This action removes a #${id} top10`;
  }
}
