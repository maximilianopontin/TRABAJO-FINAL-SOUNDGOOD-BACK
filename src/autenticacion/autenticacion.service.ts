import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';//instalamos json web token: npm install --save @nestjs/jwt 
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { HashService } from './hash/hash.service';
@Injectable()
export class AutenticacionService {
  @Inject ('USUARIO_REPOSITORY')
  private readonly usuarioRepository: Repository<Usuario>;

  constructor(//recibimos la contraseña hasheada desde hashservice e inyectamos el servicio de gestion de token (jwt)
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}
  //revisar
  async register(createUsuarioDto: CreateUsuarioDto) {
    // Aseguramos que la contraseña se ha encriptado correctamente
    const securedPassword = await this.hashService.hashPassword(
      createUsuarioDto.contraseña,//contraseña recibida por el usuario
    );

    try {
      // Creamos la entidad de usuario con los datos proporcionados
      const newUsuario = this.usuarioRepository.create({
        ...createUsuarioDto,
        contraseña: securedPassword,//Se reemplaza la propiedad contraseña con securedPassword para que se almacene la versión cifrada de la contraseña en lugar de la original.
      });
      await this.usuarioRepository.save(newUsuario);//guardamos usuario que tiene id, nombre, username,fecha de nacimiento,email y contraseña
      const { contraseña, usuarioId, ...rest } = newUsuario;//desestructuramos el id y contraseña del nuevo usuario
      return rest;//devolvemnos el resto de las propiedades que el usuario debe ver
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //creamos metodo para loguear usuario y devolvemos un token de acceso como objeto string
  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    //validar email
    //buscamos email que paso por parametro el usuario
    const usuario = await this.usuarioRepository.findOneBy({
      email: loginDto.email,
    });
    //si el email no coincide con el mail del usuario del dto, lanza una excepcion
    if (!usuario) throw new UnauthorizedException('Invalid Email or Password');
    console.log('Contraseña proporcionada:', loginDto.contraseña);
    console.log('Contraseña almacenada (hash):', usuario.contraseña);

     //si el email coincide vamos a validar password
    const isAuthenticated = await this.hashService.comparePassword(
      //recibe contraseña del login y la contraseña almacenada en la base de datos para ese usuario
      loginDto.contraseña,
      usuario.contraseña,

    );console.log('Resultado de comparación:', isAuthenticated); // ¿Coinciden las contraseñas?
    //sino coincide la contraseña lanzamos excepcion
    if (!isAuthenticated)
      throw new UnauthorizedException('Invalid  Password');

    const payload = {
      //informacion del usuario que le agregamos al token
      sub: usuario.usuarioId,
      userName: usuario.userName,
      email: usuario.email,
    };
//si el usuario esta autenticado, devolvemos un objeto que guarda el servicio jwt con el metodo signAsync y genera nuestro token con sus 3 partes
    return { access_token: await this.jwtService.signAsync(payload) };
  }

}
