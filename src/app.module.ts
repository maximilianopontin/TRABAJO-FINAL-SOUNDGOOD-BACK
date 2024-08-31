import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CancionesModule } from './canciones/cancion.module';
import { ArtistasModule } from './artistas/artistas.module';

@Module({
  imports: [UsuariosModule, CancionesModule, ArtistasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
