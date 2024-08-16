import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
    constructor(
        @Inject('USUARIO_REPOSITORY')
        private usuarioRepository: Repository<Usuario>
    ) { }

    async findAll(): Promise<Usuario[]> {
        const usuario = await this.usuarioRepository.find();
        if (!usuario.length) throw new NotFoundException("no usuario in database");
        return await this.usuarioRepository.find();
    }

    async findOne(id:number) {
        return `${id}`

    }

    async createOne(createUsuarioDto: CreateUsuarioDto):Promise<Usuario> {
        //buscar el autor por id
        const usuario = this.usuarioRepository.create(createUsuarioDto);
        return this.usuarioRepository.save(usuario);
    }
    async updanteOne(id: number, updateUsuarioDto: UpdateUsuarioDto) {
        return await this.usuarioRepository.update(Number(id), updateUsuarioDto)
    }
    async deleteOne(id: number) {
        return this.usuarioRepository.delete(id)
    }
}
