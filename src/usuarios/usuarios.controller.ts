import { Controller, Get, Body, Patch, Delete, Request, UseGuards} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AutenticacionGuard } from 'src/autenticacion/autenticacion.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }
  
 
  @Get()
  findAll() {
    return this.usuariosService.findAllUsers();
  }

 @UseGuards(AutenticacionGuard)
  @Get('perfil')
  findOne(@Request() req) {
    const userId = req.userName.sub
     // Obtenemos el userId desde el token de autenticación
    return this.usuariosService.findOneUser(userId);
  }
  
  @UseGuards(AutenticacionGuard)
  @Patch('perfil')
  update(@Request() req, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    const userId = req.userName.sub
    console.log('User ID from token:', userId); 
    return this.usuariosService.updateOneUser(userId, updateUsuarioDto);
  }

  @UseGuards(AutenticacionGuard)
  @Delete('perfil')
  delete(@Request() req) {
    const userId = req.user.sub; 
    return this.usuariosService.deleteOneUser(userId);
  }
}
