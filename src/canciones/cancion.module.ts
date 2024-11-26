import { Module } from '@nestjs/common';
import { CancionesService } from './cancion.service';
import { CancionesController } from './cancion.controller';
import { cancionProviders } from './cancion.providers';
import { DatabaseModule } from 'src/database/database.module';
import { generoProviders } from 'src/generos/genero.providers';
import { artistaProviders } from 'src/artistas/artistas.providers';
import { usuarioProviders } from 'src/usuarios/usuario.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CancionesController],
  providers: [...cancionProviders, ...generoProviders, ...artistaProviders, ...usuarioProviders, CancionesService],
  exports: [...cancionProviders]
})
export class CancionesModule { }
