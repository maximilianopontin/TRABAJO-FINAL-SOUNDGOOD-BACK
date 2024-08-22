import { Injectable, Inject, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
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

    async findOneUser(@Param('id') userId: number): Promise<Usuario> {
        const user = await this.usuarioRepository.findOne({
            where: { id: userId }
        }); //para buscar un usuario con un ID específico. Esto asegura que se busque el usuario correcto en función del parámetro userId.
        if (!user) throw new NotFoundException(`EL usuario con id ${userId} no existe.`)
        return user;
    }

    async createOne(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
        //buscar el autor por id
        const usuario = this.usuarioRepository.create(createUsuarioDto);
        return this.usuarioRepository.save(usuario); 
        //Este método guarda la instancia creada en la base de datos. Si el guardado es exitoso, devuelve la entidad guardada.
    }

    async updanteOne(id: number, updateUsuarioDto: UpdateUsuarioDto) {
        return await this.usuarioRepository.update(Number(id), updateUsuarioDto)
    }
    async deleteOne(id: number) {
        return this.usuarioRepository.delete(id)
    }
}
