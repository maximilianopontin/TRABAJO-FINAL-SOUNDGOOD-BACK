import { Module } from '@nestjs/common';
import { CancionesService } from './cancion.service';
import { CancionesController } from './cancion.controller';
import { cancionProviders } from './cancion.providers';
import { DatabaseModule } from 'src/database/database.module';
import { generoProviders } from 'src/generos/genero.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CancionesController],
  providers: [...cancionProviders, ...generoProviders, CancionesService],
  exports: [...cancionProviders]
})
export class CancionesModule { }
