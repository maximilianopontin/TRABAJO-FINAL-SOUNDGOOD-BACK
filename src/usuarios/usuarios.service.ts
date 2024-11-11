import { Injectable, Inject, NotFoundException, Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
    constructor(
        @Inject('USUARIO_REPOSITORY')
        private usuarioRepository: Repository<Usuario>
    ) { }

    async findAllUsers(): Promise<Usuario[]> {
        const usuario = await this.usuarioRepository.find();
        if (!usuario.length) throw new NotFoundException("no usuario in database");
        return await this.usuarioRepository.find();
    }

    async findOneUser(userId: number): Promise<Usuario> {
        const user = await this.usuarioRepository.findOne({
            where: { usuarioId: userId }
        }); //para buscar un usuario con un ID específico. Esto asegura que se busque el usuario correcto en función del parámetro userId.
        if (!user) throw new NotFoundException(`EL usuario con id ${userId} no existe.`)
        return user;
    }

    async updateOneUser(userId: string, updateUsuarioDto: UpdateUsuarioDto): Promise<any> {
        // Utilizamos preload para cargar la entidad de usuario con los nuevos datos
        const newUsuario = await this.usuarioRepository.preload({
            userName: userId, // El userId ahora proviene del token, no de la URL
          ...updateUsuarioDto,  // Se rellenan los campos del DTO en la entidad
        });
      
        // Si no se encuentra el usuario, lanzamos una excepción
        if (!newUsuario) {
          throw new NotFoundException(`El usuario con id ${userId} no existe.`);
        }
      
        // Guardamos los cambios en la base de datos
        return this.usuarioRepository.save(newUsuario);
      }

    async deleteOneUser(@Param('id') userId: number): Promise<any> {
        // busca el usuario por su ID
        const user = await this.usuarioRepository.findOne({
            where: { usuarioId: userId }
        });
        if (!user) throw new NotFoundException(`EL usuario con id ${userId} no existe.`)
        //si el usuario existe, lo eliminamos 
        await this.usuarioRepository.delete(userId);
        //devuelve un msj con el nombre del usuario eliminado
        return { message: `Usuario ${user.nombre} ha sido eliminado` };
    }
}
