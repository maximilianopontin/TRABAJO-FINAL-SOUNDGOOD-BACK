import { Controller, Post, Body, HttpCode, HttpStatus, Patch, Request, UseGuards} from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { LoginDto } from './dto/login.dto';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UpdateUsuarioDto } from 'src/usuarios/dto/update-usuario.dto';
import { AutenticacionGuard } from './autenticacion.guard';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(
    private readonly autenticacionService: AutenticacionService,
    private readonly usuariosService: UsuariosService
  ) {}

  @Post('registro')
  @ApiResponse({status: 201, description:'El registro se ha creado correctamente.'})
  @ApiResponse({ status: 403, description: 'Prohibido.'})
  register (@Body()CreateUsuarioDto:CreateUsuarioDto){
    return this.autenticacionService.register(CreateUsuarioDto);
  }

  @Post('/login')
  @ApiResponse({status: 201, description:'El registro se ha creado correctamente.'})
  @ApiResponse({ status: 403, description: 'Prohibido.'})
  @HttpCode(HttpStatus.OK)//codigo de respuesta para cuando se loguee el usuario
  login (@Body()loginDto:LoginDto){
    return this.autenticacionService.login(loginDto);
  }

  @Patch('/update')
  @UseGuards(AutenticacionGuard) 
  async updateProfile(@Request() req, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    const userId = req.user.sub; // Obtenemos el usuario autenticado desde el token
    return this.usuariosService.updateOneUser(userId, updateUsuarioDto);
  }
}
