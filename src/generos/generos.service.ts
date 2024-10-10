import { Inject, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { Repository } from 'typeorm';
import { Genero } from './entities/genero.entity';

@Injectable()
export class GenerosService {
  constructor(
    @Inject('GENERO_REPOSITORY')
    private  generoRepository:
    Repository<Genero>
  ){}
 async createOneGenero(createGeneroDto: CreateGeneroDto): Promise<Genero>{
    const genero = this.generoRepository.create(createGeneroDto);
    return this.generoRepository.save(genero);
  }

   async findAllGenero(): Promise <Genero[]> {
    const genero = await this.generoRepository.find();
    if (!genero.length) throw new NotFoundException('no se encontraron generos');
    return await this.generoRepository.find(); 
  }

  async findOneGenero(@Param('id') generoId: number): Promise<Genero> {
const genero = await this.generoRepository.findOne({
  // traigo ademas del gnero correspondiente al id, las canciones asociadas a ese genero
  where :{ generoId:generoId},
  relations: ['canciones']
}); 
if (!genero) throw new NotFoundException(`El genero con id : ${generoId} no exite`);
    return genero;
  }

  async updateOneGenero(@Param('id') generoId: number, updateGeneroDto: UpdateGeneroDto): Promise<any> {
    const genero = await this.generoRepository.preload({
generoId: generoId,
...updateGeneroDto
    });
    if (!genero) throw new NotFoundException (`El genero con id:${generoId} no existe`)
    return this.generoRepository.save(genero);
  }

  async removeOneGenero(@Param('id')generoId: number): Promise<any> {
    const genero = await this.generoRepository.findOne ({
      where: {generoId: generoId}
    })
    if (!genero) throw new NotFoundException (`El genero con id:${generoId} no se encuentra`);
    await this.generoRepository.delete(generoId);
    return {message: `Genero ${genero.genero} ha sido eliminado`};
    
  }
}
