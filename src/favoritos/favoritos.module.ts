import { Module } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { FavoritosController } from './favoritos.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usuarioProviders } from 'src/usuarios/usuario.providers';
import { favoritoProviders } from './favoritos.providers';
import { cancionProviders } from 'src/canciones/cancion.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FavoritosController],
  providers: [...favoritoProviders, ...usuarioProviders, ...cancionProviders, FavoritosService],
  exports: [...favoritoProviders]
})
export class FavoritosModule { }
