import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { HashService } from './hash/hash.service';
import { usuarioProviders } from 'src/usuarios/usuario.providers';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config'; //instalamos para cargar las variables del archivo .env: npm i @nestjs/config
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Module({
  imports: [
    ConfigModule.forRoot(),//configuracion del modulo
    DatabaseModule,
    //registramos el modulo jwt
    JwtModule.register({
      global: true,//corre para todo el proyecto
      secret: process.env.JWT_SECRET,//clave segura ue traemos de archivo .env
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },//fecha de vencimiento del token
    }),],
  controllers: [AutenticacionController],
  providers: [AutenticacionService, HashService,UsuariosService, ...usuarioProviders], //necesitamos acceder a la entidad usuario dentro del repositorio
})
export class AutenticacionModule {}
