//guardian de ruta, se crea para controlar el acceso a ciertas rutas de la app. solo usuarios autorizados pueden acceder a ella

import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class AutenticacionGuard implements CanActivate {//implementa la interfaz CanActivate, y se utiliza para interceptar peticiones entrantes y decidir si se debe conceder acceso o no.
    constructor(private jwtService: JwtService) {}//inyecta jwtservice para verificar y decodificar el token JWT.
    //define metodo canActivate que permite acceder al contexto de ejecución (representa la solicitud HTTP y la respuesta)
    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();//Convierte el contexto de ejecución a contexto HTTP para obtener la solicitud (request).
      const token = this.extractTokenFromHeader(request);//Llama al método extractTokenFromHeader para extraer el token JWT del encabezado Authorization de la solicitud 
      //si el token no existe o esta vacio, lanza excepcion
      if (!token) {
        throw new UnauthorizedException();
      }
      //verificamos token, usando el método verifyAsync y la clave secreta almacenada en la variable de entorno JWT_SECRET.
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });
        //Si el token es inválido, ha expirado, o no se puede verificar, lanza una excepcion
      } catch (error) {
        throw new UnauthorizedException();
      }
      return true;//Devuelve true si el token fue validado correctamente, lo que significa que se concede acceso a la ruta protegida.
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
    //Desestructura el resultado en dos partes: type y token. type debería ser 'Bearer' y token debería ser el valor del token JWT.
      const [type, token] = request.headers.authorization?.split(' ') ?? [];//sepra el valor del encabezado usando un espacio
      // Si el tipo es 'Bearer', devuelve token. Si no, devuelve undefined para indicar que el token no está presente o es inválido.
      return type === 'Bearer' ? token : undefined;
    }
  }
  