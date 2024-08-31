import { Inject, Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all generos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} genero`;
  }

  update(id: number, updateGeneroDto: UpdateGeneroDto) {
    return `This action updates a #${id} genero`;
  }

  remove(id: number) {
    return `This action removes a #${id} genero`;
  }
}
