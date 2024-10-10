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


    async findOneUser(@Param('id') userId: number): Promise<Usuario> {
        const user = await this.usuarioRepository.findOne({
            where: { usuarioId: userId }
        }); //para buscar un usuario con un ID específico. Esto asegura que se busque el usuario correcto en función del parámetro userId.
        if (!user) throw new NotFoundException(`EL usuario con id ${userId} no existe.`)
        return user;
    }

    async updateOneUser(@Param('id') userId: number, updateUsuarioDto: UpdateUsuarioDto): Promise<any> {
        const newUsuario = await this.usuarioRepository.preload({
        // `preload` intenta crear una nueva instancia de usuario con los campos actualizados del DTO,
        //basándose en el ID proporcionado. Si no encuentra el usuario, devolverá `undefined`.
            usuarioId: userId,// Mapea el `userId` al campo `usuarioId` de la entidad.
            ...updateUsuarioDto// Rellena la instancia con las propiedades del DTO.
        });
        if (!newUsuario) throw new NotFoundException(`EL usuario con id ${userId} no existe.`)

        return this.usuarioRepository.save(newUsuario) //guarda el usuario actualizado
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
