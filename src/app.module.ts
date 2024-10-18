import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CancionesModule } from './canciones/cancion.module';
import { ArtistasModule } from './artistas/artistas.module';
import { GenerosModule } from './generos/generos.module';
import { FavoritosModule } from './favoritos/favoritos.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { join } from 'node:path';
import { ServeStaticModule } from '@nestjs/serve-static';//permite servir archivos estáticos desde una carpeta del sistema de archivos del servidor a través de una ruta pública en tu aplicación.
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './health/health.module';
@Module({
  imports: [ ThrottlerModule.forRoot([
    {
      //name podemos agregarle nombre con la cantidad de peticion que le permito por minuto, esto en caso de que necesitemos distintos limites para las solictudes
      ttl: 60000,// ttl Tiempo de vida en segundos para la limitación de solicitudes (60 segundos)
      limit: 10, // limit Número máximo de solicitudes permitidas por IP en el periodo de tiempo (10 solicitudes)
    },
  ]),

  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),// Ruta donde se encuentran los archivos estáticos
    serveRoot: '/uploads',// La URL en la que se servirán los archivos estáticos
  }),
    UsuariosModule, CancionesModule, ArtistasModule, GenerosModule, FavoritosModule, PlaylistsModule, AutenticacionModule,HealthModule],
  controllers: [AppController],
  providers: [AppService,
    {provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
