import { Controller, Post, Body, HttpCode, HttpStatus} from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { LoginDto } from './dto/login.dto';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Post('registro')
  register (@Body()CreateUsuarioDto:CreateUsuarioDto){
    return this.autenticacionService.register(CreateUsuarioDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)//codigo de respuesta para cuando se loguee el usuario
  login (@Body()loginDto:LoginDto){
    return this.autenticacionService.login(loginDto);
  }
}
