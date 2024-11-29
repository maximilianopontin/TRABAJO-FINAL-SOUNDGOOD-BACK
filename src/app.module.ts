import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CancionesModule } from './canciones/cancion.module';
import { ArtistasModule } from './artistas/artistas.module';
import { GenerosModule } from './generos/generos.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { MercadoPagoController } from './mercadopago/mercadopago.controller';
import { MercadopagoService } from './mercadopago/mercadopago.service';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { FilesModule } from './files/files.modules';
import { HealthModule } from './health/health.module';
/*
@Module({
  imports: [ ThrottlerModule.forRoot([
    {
      //name podemos agregarle nombre con la cantidad de peticion que le permito por minuto, esto en caso de que necesitemos distintos limites para las solictudes
      ttl: 60000,// ttl Tiempo de vida en segundos para la limitación de solicitudes (60 segundos)
      limit: 10, // limit Número máximo de solicitudes permitidas por IP en el periodo de tiempo (10 solicitudes)
    },
  ]),
    UsuariosModule, CancionesModule, ArtistasModule, GenerosModule, PlaylistsModule, AutenticacionModule, FilesModule,HealthModule],
  controllers: [AppController, MercadoPagoController],
    
  providers: [AppService, MercadopagoService, {provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
    

})
export class AppModule {}*/
@Module({
  imports: [UsuariosModule, CancionesModule, ArtistasModule, GenerosModule, PlaylistsModule, AutenticacionModule, FilesModule],
  controllers: [AppController, MercadoPagoController],
    
  providers: [AppService, MercadopagoService],
    

})
export class AppModule {}
